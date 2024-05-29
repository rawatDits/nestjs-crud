import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { PostsModule } from 'src/posts/posts.module';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [
    forwardRef(() => PostsModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
