import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ForbiddenException,
} from '@nestjs/common';
import type { Response } from 'express';

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: ForbiddenException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(exception.getStatus()).json({
      status: 'error',
      reason: 'Access denied',
      timestamp: new Date().toISOString(),
    });
  }
}