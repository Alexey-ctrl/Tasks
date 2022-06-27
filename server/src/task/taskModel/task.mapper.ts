import {Injectable} from "@nestjs/common";
import {BaseDataMapper} from "../../baseModel/BaseDataMapper";
import {Task} from "./task";
import {DbService} from "../../dbModule/db.service";
import {TaskDto} from "../dto/taskDto";
import {UserMapper} from "../../user/userModel/user.mapper";

@Injectable()
export class TaskMapper extends BaseDataMapper {
    readonly tableName = "tasks";

    constructor(dbService: DbService, private readonly userMapper: UserMapper) {
        super(dbService);
    }

    protected async insert(task: Task): Promise<Task> {
        const result = await this.dbService.execute(
            `INSERT INTO ${this.tableName} (title, message, is_completed, user_id) VALUES ($1, $2, $3, $4) RETURNING id`,
            [task.title, task.message, task.is_completed, task.user_id]
        );
        task.id = result[0].id;
        return task;
    }

    protected async update(task: Task): Promise<Task> {
        await this.dbService.execute(
            `UPDATE ${this.tableName} SET title = $1, message = $2, is_completed = $3, user_id = $4 WHERE id = $5`,
            [task.title, task.message, task.is_completed, task.user_id, task.id]
        );
        return task;
    }

    async getAll(): Promise<TaskDto[]> {
        const result = await this.dbService.execute(
            `SELECT T.*, U.username FROM ${this.tableName} AS T 
                  JOIN ${this.userMapper.tableName} AS U
                  ON T.user_id = U.id ORDER BY T.id ASC`
        );
        return result.map(task => ({
            id: task.id,
            title: task.title,
            message: task.message,
            is_completed: task.is_completed,
            user: {
                id: task.user_id,
                username: task.username
            }
        }));
    }
}