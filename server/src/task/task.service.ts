import {Injectable} from "@nestjs/common";
import {TaskMapper} from "./taskModel/task.mapper";
import {CreateTaskDto} from "./dto/createTaskDto";
import {Task} from "./taskModel/task";
import {TaskDto} from "./dto/taskDto";

@Injectable()
export class TaskService {
    constructor(private readonly taskMapper: TaskMapper) {
    }

    getAll(): Promise<TaskDto[]> {
        return this.taskMapper.getAll();
    }

    async updateTask(taskDto: TaskDto) {
        const task = new Task({
            title: taskDto.title,
            message: taskDto.message,
            user_id: taskDto.user.id,
        } as CreateTaskDto);
        task.id = taskDto.id;
        task.is_completed = taskDto.is_completed;

        return await this.taskMapper.save(task);
    }

    deleteTask(id) {
        return this.taskMapper.delete(id);
    }

    async createTask(taskDto: TaskDto): Promise<Task> {
        const task = new Task({
            title: taskDto.title,
            message: taskDto.message,
            user_id: taskDto.user.id
        } as CreateTaskDto);
        await this.taskMapper.save(task);
        return task
    }
}