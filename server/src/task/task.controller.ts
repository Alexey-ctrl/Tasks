import {Controller, Get} from "@nestjs/common";
import {TaskService} from "./task.service";
import {TaskDto} from "./dto/taskDto";

@Controller("api/tasks")
export class TaskController {
    constructor(private readonly taskService: TaskService) {
    }

    @Get()
    async getAll(): Promise<TaskDto[]> {
        return await this.taskService.getAll();
    }
}