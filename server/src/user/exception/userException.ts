import {HttpException, HttpStatus} from "@nestjs/common";

export abstract class UserException extends HttpException {
    constructor(message, code = HttpStatus.CONFLICT) {
        super(message, code);
    }
}

export class UserAlreadyExistException extends UserException {
    constructor(username) {
        super(`User ${username} already exist`);
    }
}

export class UserPasswordLengthException extends UserException {
    constructor() {
        super('Password length is too short');
    }
}

export class UsernameEmptyException extends UserException {
    constructor() {
        super('Username is empty');
    }
}