import { Logger, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './users/user.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PostsModule } from './posts/posts.module';
import { CustomMiddleware } from './helper/middleware/custsom-middleware';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import config from './helper/config/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [config],
    }),
    MongooseModule.forRoot(process.env.MONOG_URL),
    // MongooseModule.forRoot("mongodb://localhost:27017/node-rest"),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
    }),
    UserModule,
    PostsModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [Logger],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CustomMiddleware).forRoutes('*');
  }
}
