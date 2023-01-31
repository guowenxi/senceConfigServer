import { Injectable, Module, OnModuleInit } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { APP_GUARD , APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsGateway } from './ws.gateway';
import { GraphQLController } from './GraphQL/module';
import { FileController } from './File/module';
import { EvalCodeController } from './EvalCode/module';
// import { UserManagerController } from './UserManager/module';
import { mysql } from './mysql';
import { ConfigModule } from '@nestjs/config'; //用于获取node全局环境变量的配置
import config from '@/config/config';
import { AuthGuard } from '@/auth.guard';
import { LoggingInterceptor } from './logging.interceptor';
import { ScheduleModule } from '@nestjs/schedule';
import { TransformInterceptor } from '@transform.interceptor';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleList } from '@/modules/entities/ScheduleList';
import { Repository } from 'typeorm';
import { ScheduleManager } from '@/modules/entities/ScheduleManager';
import { SencePageController } from '@SencePage/module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.env.NODE_ENV}.env`,
      isGlobal: true,
      load: [config],
    }),//全局配置
    // GraphQLModule.forRoot({
    //   debug: true,
    //   playground: false,
    // }),
    mysql, //注入mysql
    ScheduleModule.forRoot(), //开启计划任务模块

     //可注入其他contrl
    GraphQLController,
    FileController,
    EvalCodeController,
    TypeOrmModule.forFeature([ScheduleManager,ScheduleList]),
    
    SencePageController,
  ],
  //主contrl
  controllers: [
    AppController,
  ],
  providers: [
    WsGateway,
    AppService,
    //全局路由守卫
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    //全局拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
    // //响应拦截器
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: TransformInterceptor,
    // },
  ],
})


export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log(`app启动`);
  }
}
