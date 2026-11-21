import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  /**
   *
   * @param value the input value of the currently processed argument before it is received by our route handling method
   * @param metadata the metdata of the currently processed argument
   * @returns whatever value is returned from this function completely overrides the previous value of the arugment
   *
   * this is useful when the data passed from the client needs to undergo some change, or in case we need to provide default values
   */
  transform(value: string, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      throw new BadRequestException(
        `Validation failed. "${val}" is not an integer.`,
      );
    }
    return val;
  }
}
