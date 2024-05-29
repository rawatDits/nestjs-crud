import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ require: true })
  id: number;

  @Prop({ require: true })
  firstname: string;

  @Prop()
  lastname: string;

  @Prop({ require: true, unique: true })
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
