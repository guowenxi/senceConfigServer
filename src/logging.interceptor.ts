import {
  Injectable, NestInterceptor, ExecutionContext, CallHandler,
  BadGatewayException
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('Before...');
    const now = Date.now();
    return next
      .handle()
      .pipe(
        catchError(err => throwError(new BadGatewayException())),
      )
  }
}