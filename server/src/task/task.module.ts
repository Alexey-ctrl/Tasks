import {Module} from "@nestjs/common";
import {TaskController} from "./task.controller";
import {TaskService} from "./task.service";
import {TaskMapper} from "./taskModel/task.mapper";
import {DbModule} from "../dbModule/db.module";
import {TaskGateway} from "./task.gateway";
import {UserModule} from "../user/user.module";

@Module({
    imports: [DbModule, UserModule],
    controllers: [TaskController],
    providers: [TaskService, TaskMapper, TaskGateway]
})
export class TaskModule {

}