import { Injectable, NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction): void {
    const startedAt = Date.now();
    const requestLabel = `${request.method} ${request.originalUrl}`;

    console.log(`[LoggerMiddleware] ${requestLabel}`);

    response.once('finish', () => {
      console.log(
        `[LoggerMiddleware] ${requestLabel} completed in ${Date.now() - startedAt}ms`,
      );
    });

    next();
  }
}
