import { HttpException, HttpStatus } from "@nestjs/common"

export class DogIdPositiveNumberException extends HttpException {
    constructor() {
        super("Dog ID must be a positive integer", HttpStatus.BAD_REQUEST);
    }
}