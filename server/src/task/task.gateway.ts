import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer
} from "@nestjs/websockets";
import {Server, Socket} from 'socket.io';
import {TaskDto} from "./dto/taskDto";
import {UserService} from "../user/user.service";
import {TaskService} from "./task.service";

@WebSocketGateway()
export class TaskGateway {
    constructor(private readonly userService: UserService, private readonly taskService: TaskService) {
    }

    @WebSocketServer()
    private server: Server;

    @SubscribeMessage('update-task')
    async updateTask(@MessageBody() taskDto: TaskDto, @ConnectedSocket() client: Socket) {
        const isVerified = this.userService.verifyUserJwt(taskDto.JWT);
        if (!isVerified)
            return client.emit('verify-error', taskDto.id);

        let task = null;
        try {
            task = await this.taskService.updateTask(taskDto);
        } catch (e) {
            return client.emit('error', {error: e.message, id: taskDto.id});
        }
        client.broadcast.emit('update-task', task.getDto(taskDto.user));
    }

    @SubscribeMessage('delete-task')
    async deleteTask(@MessageBody() id: number, @ConnectedSocket() client: Socket) {
        try {
            await this.taskService.deleteTask(id);
        } catch (e) {
            return client.emit('error', {error: e.message, id: id});
        }
        this.server.emit('delete-task', id);
    }

    @SubscribeMessage('create-task')
    async createTask(@MessageBody() taskDto: TaskDto, @ConnectedSocket() client: Socket) {
        const isVerified = this.userService.verifyUserJwt(taskDto.JWT);
        if (!isVerified)
            return client.emit('verify-error', taskDto.id);

        let task = null;
        try {
            task = await this.taskService.createTask(taskDto);
        } catch (e) {
            return client.emit('error', {error: e.message, id: null});
        }
        this.server.emit('add-task', task.getDto(taskDto.user));
    }
}