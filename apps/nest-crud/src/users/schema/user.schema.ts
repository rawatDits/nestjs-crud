import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Role } from '../dto/create-user.dto';

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  id: number;

  @Prop()
  firstname: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  // @Prop()
  // role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
