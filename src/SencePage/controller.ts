import { Controller, Req, Res, Get ,Post , Render ,HttpCode, Options } from '@nestjs/common';
import { Param ,Query ,Body } from '@nestjs/common';
import { _RES } from '@util/response';
import { service } from './service';

//括号内为路由路径
@Controller('sencePage')
export class AppController {
  constructor(
    private readonly service: service
    ) {}
    //获取场景页面列表
  @Get('getSencePageList')
  @HttpCode(200)
  async getSencePageList(
    @Query() query
  ): Promise<any>  {
    const instance = await this.service.getSencePageList(query);
    return _RES(instance)
  }
  @Post('setSencePage')
  @HttpCode(200)
  async setSencePage(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.setSencePage(body);
    return _RES(instance)
  }


  @Post('updateSencePage')
  @HttpCode(200)
  async updateSencePage(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.updateSencePage(body);
    return _RES(instance)
  }
  @Post('deleteSencePage')
  @HttpCode(200)
  async deleteSencePage(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.deleteSencePage(body);
    return _RES(instance)
  }

  @Get('getSencePageInfo')
  @HttpCode(200)
  async getSencePageInfo(
    @Query() query,
  ): Promise<any>  {
    const instance = await this.service.getSencePageInfo(query);
    return _RES(instance)
  }

  @Post('setSencePageInfo')
  @HttpCode(200)
  async setSencePageInfo(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.setSencePageInfo(body);
    return _RES(instance)
  }
}
