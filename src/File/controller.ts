import {
  Controller,
  Req,
  Res,
  Get,
  Post,
  Render,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
  StreamableFile,
  Response,
} from '@nestjs/common';
import { FileInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { Param, Query, Body, Module } from '@nestjs/common';
import { service } from './service';
import { Express } from 'express';
import * as fs from 'fs';
import { ConfigModule } from '@nestjs/config'; //用于获取node全局环境变量的配置
import { ConfigService } from '@nestjs/config';
import { createReadStream } from 'fs';
import { join } from 'path';
//括号内为路由路径
@Controller('file')
export class AppController {
  constructor(
    private readonly service: service,
    private configService: ConfigService, //导入全局配置变量
  ) {}
  //括号内为路由路径名,会生成路由映射
  @Post('uploadFile')
  //多文件上传/不限制文件类型
  @UseInterceptors(AnyFilesInterceptor())
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    // @Req()  //可以返回专门的注释器对此方法进行操作
  ) {
    let _fileList = [];
    const _path = this.configService.get('filePath');
    //循环保存到指定路径
    _fileList = await Promise.all(files.map(async (file) => {
      const { originalname, buffer } = file;
      //截取文件名后缀
      const fileType = originalname.split('.').pop();
      const _uploadFile = await this.service.uploadFile({
        ...file,
        fileType:fileType,
      });
      //获取全局配置变量
      /* 将文件进行存储 */
      //如果存在则不保存文件
      if (!_uploadFile?.cache) {
        //如果当前文件夹不存在, 则创建一个文件夹,
        /**
         * TODO 后续可扩充按日期方式文件功能
         */
        !fs.existsSync(_path) ? fs.mkdirSync(_path) : null;

        //替换文件名名字为hash名,并保存文件
        fs.writeFileSync(
          `${_path}/${_uploadFile.fileId}.${fileType}`,
          files[0].buffer,
        );
      }
      return _uploadFile.fileId;
    }))
    return {
      code: 200,
      success: 1,
      message: '上传成功',
      data: _fileList,
    };
  }
  //以流的形式读取文件
  @Get('downloadFile')
  async downloadFile(
    @Query() query,
    @Response({ passthrough: true }) res
  ): Promise<StreamableFile> {
    const _path = this.configService.get('filePath');
    const _file =  await this.service.loadFile(query);
    const file = createReadStream(join(process.cwd(),_path, `${query.fileId}.${_file.fileType}`),{});
    res.set({
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename=${_file.fileName}`
    })
    return new StreamableFile(file);
  }
 
}
