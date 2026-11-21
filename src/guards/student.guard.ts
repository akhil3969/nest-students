import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class StudentGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    if (request.headers['x-student'] !== 'true') {
      throw new UnauthorizedException('Student header is required');
    }

    return true;
  }
}
