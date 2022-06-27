import {HttpException, HttpStatus} from "@nestjs/common";

export abstract class TaskException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.CONFLICT);
    }
}

export class TaskEmptyTitleException extends TaskException {
    constructor() {
        super("Task title is empty");
    }
}

export class TaskEmptyMessageException extends TaskException {
    constructor() {
        super("Task message is empty");
    }
}