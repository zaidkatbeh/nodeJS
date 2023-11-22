import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class ValidationExceptionFilterFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}
