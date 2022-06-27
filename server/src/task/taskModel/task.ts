import {BaseDataModel} from "../../baseModel/BaseDataModel";
import {CreateTaskDto} from "../dto/createTaskDto";
import {TaskEmptyMessageException, TaskEmptyTitleException} from "../exeption/TaskException";
import {TaskDto} from "../dto/taskDto";
import {UserDto} from "../../user/dto/userDto";

export class Task extends BaseDataModel {
    title: string;
    message: string;
    user_id: number;
    is_completed = false;

    constructor(createTaskDto: CreateTaskDto) {
        super();
        this.title = createTaskDto.title;
        this.message = createTaskDto.message;
        this.user_id = createTaskDto.user_id;
    }

    checkValid(): void {
        if (!this.title)
            throw new TaskEmptyTitleException();
        if (!this.message)
            throw new TaskEmptyMessageException();
    }

    getDto(user: UserDto): TaskDto {
        return {
            id: this.id,
            message: this.message,
            title: this.title,
            is_completed: this.is_completed,
            user: user
        }
    }
}