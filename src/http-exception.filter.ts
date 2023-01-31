import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

import { _RES } from "./util/response";

@Catch(HttpException)
export class HttpExceptionFilter<T> implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 拿到上下文
    const ctx = host.switchToHttp();

    // 响应
    const response = ctx.getResponse<Response>();

    // 请求
    const request = ctx.getRequest<Request>();

    // 状态码
    const status = exception.getStatus();

    const msg = exception.getResponse();

    const message = typeof msg === "string" ? msg["message"] : msg["message"][0];

    response
      .status(status)
      .json(_RES({
        success: 0,
        message,
        data:{
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          method: request.method
        }
      })
      );
  }
}
