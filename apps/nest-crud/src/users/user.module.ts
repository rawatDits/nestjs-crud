import { Module, forwardRef } from '@nestjs/common';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { PostsModule } from '../posts/posts.module';
import { UserSchema } from './schema/user.schema';
import { CommonModule } from '@app/common';

@Module({
  imports: [
    CommonModule,
    forwardRef(() => PostsModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UserModule {}
