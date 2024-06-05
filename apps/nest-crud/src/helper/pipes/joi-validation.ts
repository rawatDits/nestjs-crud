// }
import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from 'joi';

@Injectable()
export class JoiValidatiaonPipe implements PipeTransform {
  constructor(private schema: ObjectSchema) {}

  public transform(value: Record<string, any>) {
    const {error} = this.schema.validate(value)
    if(error){
      console.log("error")
      throw new BadRequestException({message:error.message, statusCode:HttpStatus.BAD_REQUEST})
      // throw new BadRequestException({message:error.message})
    }
     return value;
   
  }
}
