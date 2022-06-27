import {BaseDataModel} from "../../baseModel/BaseDataModel";
import {CreateUserDto} from "../dto/createUserDto";
import * as bcrypt from "bcrypt";
import {UsernameEmptyException, UserPasswordLengthException} from "../exception/userException";

export class User extends BaseDataModel {
    username: string;
    password: string;

    constructor(private readonly BCRYPT_SALT: string, createUserDto: CreateUserDto) {
        super();
        this.username = createUserDto.username;
        this.password = createUserDto.password;
    }

    async hashPassword(): Promise<void> {
        this.password = await bcrypt.hash(this.password, +this.BCRYPT_SALT);
    }

    checkValid(): void {
        if (!this.username)
            throw new UsernameEmptyException();
        if (!this.password || this.password.length < 6)
            throw new UserPasswordLengthException();
    }
}