import { Module, forwardRef } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../users/schema/user.schema';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
})
export class PostsModule {}
