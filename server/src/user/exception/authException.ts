import {HttpException, HttpStatus} from "@nestjs/common";

export abstract class AuthException extends HttpException {
    constructor(message, code = HttpStatus.CONFLICT) {
        super(message, code);
    }
}

export class UserNotFoundException extends AuthException{
    constructor(username) {
        super(`User ${username} is not found`);
    }
}

export class InvalidPasswordException extends AuthException{
    constructor() {
        super(`Invalid password`);
    }
}