import { BadRequestException } from '@nestjs/common';

export class WrongPasswordException extends BadRequestException {
    constructor(error?: string) {
        super(
            'Difficulty loggin in contact admin',
            error,
        );
    }
}

