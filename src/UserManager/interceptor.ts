import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap ,map } from 'rxjs/operators';

function filterData (data,level){
    data.map(function(item,idx){
        item.children && filterData(item.children,level+1)
        item.level = level
    })
    return data;
}
@Injectable()
export class interceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    return next
      .handle()
      .pipe(
        map((data) => {
            //对数据进行过滤 增加level字段
            let _data = filterData(data.data,1);
            return {
                ...data,
                data:_data
            };
        }),
      );
  }
}