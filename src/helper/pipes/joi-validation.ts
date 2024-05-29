// }
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class JoiValidatiaonPipe implements PipeTransform {
  constructor(private schema: any) {}

  public transform(value: any, metadata: ArgumentMetadata) {
    try {
      if (metadata.type == 'query') {
        const { error } = this.schema.query.validate(value);
        if (error) {
          throw new BadRequestException(error.details);
        }
      } else if (metadata.type == 'body') {
        const { error } = this.schema.body.validate(value);
        if (error) {
          const errorMessages = error.details.map((d) => d.message).join(', ');
          throw new BadRequestException({ message: errorMessages });
        }
      }
    } catch (error) {
      throw error instanceof BadRequestException
        ? error
        : new BadRequestException();
    }
    return value;
  }
}
