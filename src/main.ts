import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './helper/exceptions/exception-filter';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const loggerInstance = app.get(Logger);
  const config = app.get(ConfigService);
  app.useGlobalFilters(new HttpExceptionFilter(loggerInstance)); // For Error Handling
  app.useGlobalPipes(
    new ValidationPipe({
      // disableErrorMessages:true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors(), app.setGlobalPrefix('api/v1');

  await app.listen(config.get('port'), () => {
    console.log(`Server running on port ${config.get('port')}`);
  });
}
bootstrap();
