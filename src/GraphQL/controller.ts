import { Controller, Req, Res, Get ,Post , Render ,HttpCode } from '@nestjs/common';
import { Param ,Query ,Body } from '@nestjs/common';
import { service } from './service';

//括号内为路由路径
@Controller('GraphQL')
export class AppController {
  constructor(private readonly service: service) {}
//括号内为路由路径名,会生成路由映射
  @Get('getGraphQL')
  // @Render('getHello')
  async get(
    @Query() query
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ): Promise<any>  { //路由与处理函数命名无关
    
    return {}
  }
}
