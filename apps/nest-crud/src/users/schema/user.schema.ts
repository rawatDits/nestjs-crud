import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Role } from '../dto/create-user.dto';
import { Types , Document} from 'mongoose';

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

  // @Prop(raw({}))  //any data can come here 
  // metadata?:any;

  // @Prop()
  // role: Role;

  // @Prop({types:Types.ObjectId, ref:"User" , required:true})
  // userId: Types.ObjectId;
}


export const UserSchema = SchemaFactory.createForClass(User);

export const USER_MODEL = User.name
