import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  app.enableCors(),
  app.setGlobalPrefix("api/v1")
  await app.listen(3000, () => {
    console.log('Server running on port 3000');
  });
}
bootstrap();
