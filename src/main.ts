import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from "@nestjs/common";
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import {  ConfigService } from '@nestjs/config';
import axios from "axios"
import config from '@/config/config';
import { commonData } from '@/util/util';
import { HttpExceptionFilter } from '@http-exception.filter';
const https = require('https');
import { WsAdapter } from './ws.adapter';
var moment = require('moment');
import * as bodyParser from 'body-parser'

//全局请求配置
axios.defaults.baseURL = config().axiosUrl;
axios.interceptors.request.use(function (config) {
  console.log("axios",config.url)
  console.log("axios",config.data)
  // 在发送请求之前做些什么
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error);
});


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors(); //允许跨域


  app.use(bodyParser.json({limit: '20mb'}));
  app.use(bodyParser.urlencoded({limit: '20mb', extended: true}));
  // 路由前缀
  // app.setGlobalPrefix("/");


  // 加入异常过滤器
  app.useGlobalFilters(new HttpExceptionFilter());


  // 添加管道 对 字段进行限制
  app.useGlobalPipes(
    new ValidationPipe(),
  );


  const configService = app.get(ConfigService);
  //设置静态文件路径
  app.useStaticAssets(join(__dirname ,configService.get<string>('filePath')),{
    prefix: '/' // 虚拟名称,匹配虚拟路径
  });
  const port:string= configService.get<string>('port');
  //使用hbs引擎来实现html输出
  // app.setBaseViewsDir(join(__dirname, '..', 'views'));
  // app.setViewEngine('hbs');
  //开启 ws
  app.useWebSocketAdapter(new WsAdapter(app));
  
  await app.listen(port,()=>{
    console.log("启动成功",`http://localhost:${port}`);
  });
}
bootstrap();



