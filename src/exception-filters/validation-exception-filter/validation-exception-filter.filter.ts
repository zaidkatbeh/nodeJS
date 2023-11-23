import { ArgumentsHost, Catch, ExceptionFilter, HttpException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class ValidationExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse<Response>();
    const request: Request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    if(exception instanceof HttpException) {
      console.log("this is an unautharized exception");
    }    
    response
    .status(status)
    .json({
      statusCode: status,
      
    });

  }
}
