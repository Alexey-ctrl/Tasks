import {Body, Controller, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/createUserDto";
import {UserJwtDto} from "./dto/userJwtDto";

@Controller('api/users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('new')
    async newUser(@Body() createUserDto: CreateUserDto): Promise<UserJwtDto> {
        return await this.userService.registration(createUserDto);
    }

    @Post('login')
    async login(@Body() createUserDto: CreateUserDto): Promise<UserJwtDto> {
        return await this.userService.login(createUserDto);
    }
}