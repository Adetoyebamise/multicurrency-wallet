import { BadRequestException } from '@nestjs/common';

export class RequestDetailException extends BadRequestException {
    constructor(error?: string) {
        super(
            'Request Details Existed',
            error,
        );
    }
}

