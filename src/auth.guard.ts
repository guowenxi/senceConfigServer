import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
var delteKey=[
  "code",
  "idCode",
  "user",
];
@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.originalUrl);
    if(request.method === "POST"){
      delteKey.map((item)=>{
        delete request.body[item]
      })
    }
    return request;
    // return validateRequest(request);
  }
}