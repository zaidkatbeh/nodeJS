import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class ValidationExceptionFilterFilter<T> implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
