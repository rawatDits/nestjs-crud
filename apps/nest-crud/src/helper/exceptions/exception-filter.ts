import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private logger: Logger) {}
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    this.logger.error(
      `${request.method} ${request.url} ${status} ${exception.message}`,
    );

    const errorDetail = exception.getResponse();
    console.log('errorDetail', errorDetail);
    response.status(status).json({ error: true, errorDetail });
  }
}
