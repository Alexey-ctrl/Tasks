import {Injectable} from "@nestjs/common";
import {UserMapper} from "./userModel/user.mapper";
import {CreateUserDto} from "./dto/createUserDto";
import {UserAlreadyExistException} from "./exception/userException";
import {InvalidPasswordException, UserNotFoundException} from "./exception/authException";
import {User} from "./userModel/user";
import {promisify} from "util";
import * as bcrypt from "bcrypt";
import {UserDto} from "./dto/userDto";
import {sign, verify} from "jsonwebtoken";
import {UserJwtDto} from "./dto/userJwtDto";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class UserService {
    private readonly bcryptCompare = promisify(bcrypt.compare);
    private readonly singUser = (userDto: UserDto): string => sign(userDto, this.config.get('JWT_SECRET'));

    constructor(private readonly userMapper: UserMapper, private readonly config: ConfigService) {
    }

    getByUsername(username: string): Promise<User> {
        return this.userMapper.getByUsername(username);
    }

    async registration(createUserDto: CreateUserDto): Promise<UserJwtDto> {
        const user = await this.userMapper.getByUsername(createUserDto.username);
        if (user)
            throw new UserAlreadyExistException(user.username);
        const newUser = new User(this.config.get('BCRYPT_SALT'), createUserDto);
        newUser.checkValid();
        await newUser.hashPassword();
        await this.userMapper.save(newUser, false);
        return this.createUserJwtDto({id: newUser.id, username: newUser.username});
    }

    async login(createUserDto: CreateUserDto): Promise<UserJwtDto> {
        const user = await this.getByUsername(createUserDto.username);
        if (!user)
            throw new UserNotFoundException(createUserDto.username);
        const compareResult = await this.bcryptCompare(createUserDto.password, user.password);
        if (!compareResult)
            throw new InvalidPasswordException();
        return this.createUserJwtDto({id: user.id, username: user.username});
    };

    verifyUserJwt(JWT: string): boolean {
        try {
            const decode = verify(JWT, this.config.get('JWT_SECRET'));
            return true;
        } catch (e) {
            return false;
        }
    }

    private createUserJwtDto(user: UserDto): UserJwtDto {
        return {
            JWT: this.singUser(user),
            user: {
                id: user.id,
                username: user.username
            }
        }
    }
}