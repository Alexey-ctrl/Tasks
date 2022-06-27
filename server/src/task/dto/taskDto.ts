import {UserDto} from "../../user/dto/userDto";

export interface TaskDto {
    id: number;
    title: string;
    message: string;
    is_completed: boolean;
    user: UserDto;
    JWT?: string;
}