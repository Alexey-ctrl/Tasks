import {UserDto} from "./userDto";

export interface UserJwtDto{
    JWT: string,
    user: UserDto
}