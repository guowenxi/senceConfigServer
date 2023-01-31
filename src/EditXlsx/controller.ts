
  import { Controller, Req, Res, Get ,Post , Render ,HttpCode, Options, UseInterceptors, UploadedFiles  ,StreamableFile, Response,UploadedFile
} from '@nestjs/common';
import { Param ,Query ,Body } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { service } from './service';
import * as fs from 'fs';
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';

import { join } from 'path';

//括号内为路由路径
@Controller('xlsx')
export class AppController {
  constructor(
    private readonly service: service,
    private configService: ConfigService, //导入全局配置变量
    ) {}
    //获取场景页面列表
  @Post('importXlsx')
  //多文件上传/不限制文件类型
  @UseInterceptors(AnyFilesInterceptor())
  @HttpCode(200)
  async importXlsx(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<any>  {
    const instance = await this.service.importXlsx(files[0]);
    return {
      code:200,
      success:1,
      message:"读取成功",
      data:instance
    }
  }
  @Get('exportXlsx')
  @HttpCode(200)
  async exportXlsx(
    @Query() query,
    @Response({ passthrough: true }) res
  ): Promise<StreamableFile>  {
    const buffer = await this.service.exportXlsx();
    const _path = this.configService.get('filePath');
    fs.writeFileSync(
      `${_path}/${123}.xlsx`,
      buffer
      );
      const file = createReadStream(join(process.cwd(),_path, `${123}.xlsx`),{});
      res.set({
        'Content-Type': 'application/json',
        'X-Content-Type-Options':'nosniff',
        'Content-Disposition': `attachment; filename=${123}.xlsx`
      })
      return new StreamableFile(file);
      }

}
