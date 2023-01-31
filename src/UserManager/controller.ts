/* import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Render,
  HttpCode,
  Param,
  Query,
  Body,
  UseInterceptors,
} from '@nestjs/common';
import { service } from './service';

import { interceptor } from './interceptor';


//括号内为路由路径
@Controller('userManager')
export class AppController {
  constructor(
    private readonly service: service,
    private readonly res
    ) {}
  //括号内为路由路径名,会生成路由映射
  @Get('getDepartmentList')
  //方法的拦截器
  @UseInterceptors(interceptor)
  async getDepartmentList(
    @Query() query,
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ): Promise<any> {
    //路由与处理函数命名无关
    const _data = await this.service.getDepartmentList(query);
    return this.res({
      message: '读取成功',
      data: _data,
    });
  }

  @Post('addDepartmentList')
  async addDepartmentList(
    @Body() body: any,
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ): Promise<any> {
    //路由与处理函数命名无关
    const _data = await this.service.addDepartmentList(body);
    return this.res({
      message: '新增成功',
      data: _data,
    });
  }

  @Post('updateDepartmentList')
  async updateDepartmentList(
    @Body() body: any,
  ): Promise<any> {
    //路由与处理函数命名无关
    const _data = await this.service.updateDepartmentList(body);
    return this.res({
      message: '更新成功',
      data: _data,
    });
  }

  @Post('deleteDepartmentList')
  async deleteDepartmentList(
    @Body() body: any,
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ): Promise<any> {
    //路由与处理函数命名无关
    const _data = await this.service.deleteDepartmentList(body);

    return this.res({
      message: '读取成功',
      data: _data,
    });
  }
}
 */