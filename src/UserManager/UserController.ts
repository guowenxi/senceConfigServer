// import {
//   Controller,
//   Req,
//   Res,
//   Get,
//   Post,
//   Render,
//   HttpCode,
//   Param,
//   Query,
//   Body,
//   UseInterceptors,
// } from '@nestjs/common';
// import { UserService } from './UserService';
// import { unties } from '@unties';
// import { interceptor } from './interceptor';
// //括号内为路由路径
// @Controller('userManager')
// export class UserController {
//   constructor(private readonly service: UserService) {}
//   //括号内为路由路径名,会生成路由映射
//   @Get('getUserList')
//   //方法的拦截器
//   async getUserList(
//     @Query() query,
//     // @Req()  //可以返回专门的注释器对此方法进行操作
//   ): Promise<any> {
//     //路由与处理函数命名无关
//     const _data = await this.service.getUserList(query);
//     return unties.res({
//       message: '读取成功',
//       data: _data,
//     });
//   }

//   @Post('addUserList')
//   //方法的拦截器
//   async addUserList(
//     @Body() body,
//     // @Req()  //可以返回专门的注释器对此方法进行操作
//   ): Promise<any> {
//     //路由与处理函数命名无关
//     const _data = await this.service.addUserList(body);
//     return unties.res({
//       message: '读取成功',
//       data: _data,
//     });
//   }

// }
