import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UserSchema } from './schema/user.schema';

@Module({
   imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
   controllers :[UsersController],
   providers:[UsersService]
})
export class UserModule {}
