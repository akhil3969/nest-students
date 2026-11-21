import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UppercasePipe implements PipeTransform<unknown, string> {
  transform(value: unknown): string {
    if (typeof value !== 'string') {
      throw new BadRequestException('Value must be a string');
    }

    return value.toUpperCase();
  }
}
