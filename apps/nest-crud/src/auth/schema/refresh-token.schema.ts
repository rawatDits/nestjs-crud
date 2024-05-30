import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose ,{Document} from 'mongoose';
@Schema({
  timestamps: true,
})
export class RefreshToken extends Document
 {
  @Prop()
  token: string;

  @Prop()
  user_id: mongoose.Types.ObjectId;

  @Prop()
  lastname: string;

  @Prop()
  expiry_date: Date;

}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
