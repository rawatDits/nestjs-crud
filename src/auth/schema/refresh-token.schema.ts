import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose ,{Document} from 'mongoose';
@Schema({
  timestamps: true,
})
export class RefreshToken extends Document
 {
  @Prop({ require: true })
  token: string;

  @Prop({ require: true , type:mongoose.Types.ObjectId})
  user_id: mongoose.Types.ObjectId;

  @Prop()
  lastname: string;

  @Prop({ require: true })
  expiry_date: Date;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
