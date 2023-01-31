import { Controller, Req, Res, Get ,Post , Render ,HttpCode, Options } from '@nestjs/common';
import { Param ,Query ,Body } from '@nestjs/common';
import { _PAGINATION, _RES } from '@util/response';
import { service } from './service';

//括号内为路由路径
@Controller('evalCode')
export class AppController {
  constructor(
    private readonly service: service
    ) {}
//括号内为路由路径名,会生成路由映射
  @Post('eval')
  @HttpCode(200)
  // @Render('getHello')
  async eval(
    @Body() body: any
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ): Promise<any>  { //路由与处理函数命名无关
    const instance = this.service.evalCode(body);
     return {
      code:200,
      success:1,
      message:"读取成功",
      data:null
    }
  }

  //获取定时任务列表
  @Get('getSCheduleList')
  @HttpCode(200)
  async getSCheduleList( 
    @Query() query
  ): Promise<any>  {
    const instance = await this.service.getSCheduleList(query);
    return _RES({
      data: _PAGINATION({ ...instance })
    })
  }
  //删除定时任务
  @Post('deleteSCheduleList')
  @HttpCode(200)
  async deleteSCheduleList( 
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.deleteSCheduleList(body);
    return _RES(instance);
  }
  //新增定时任务
  @Post('createSChedule')
  @HttpCode(200)
  async createSChedule(
    @Body() body: any
  ): Promise<any>  {
    const {  name  , day  , minute , hour}  = body;
    const instance = await this.service.createSChedule(body);
    return _RES(instance);
  }
  //更新执行任务
  @Post('updateSChedule')
  @HttpCode(200)
  async updateSChedule(
    @Body() body: any
  ): Promise<any>  {
    const {  name  , day  , minute , hour}  = body;
    const instance = await this.service.updateSChedule(body);
    return _RES(instance);
  }
  //开始执行任务
  //停止执行任务
  @Post('executeSChedule')
  @HttpCode(200)
  async executeSChedule(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.executeSChedule(body);
    return _RES(instance);
  }

  //获取定时任务列表
  @Get('getSCheduleBlockly')
  @HttpCode(200)
  async getSCheduleBlockly(
    @Query() query
  ): Promise<any>  {
    const instance = await this.service.getSCheduleBlockly(query);

    return _RES(instance);
  }
  //保存定时任务列表
  @Post('saveSCheduleBlockly')
  @HttpCode(200)
  async saveSCheduleBlockly(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.saveSCheduleBlockly(body);

    return _RES(instance);
  }
  
  //根据任务id获取告警列表
  @Get('getSCheduleWarningList')
  @HttpCode(200)
  async getSCheduleWarningList(
    @Query() query
  ): Promise<any>  {
    const instance = await this.service.getSCheduleWarningList(query);

    return _RES(instance);
  }

  //根据任务id获取告警列表
  @Post('sendWarn')
  @HttpCode(200)
  async sendWarn(
    @Body() body: any
  ): Promise<any>  {
    const instance = await this.service.sendWarn(body);

    return _RES(instance);
  }



}
