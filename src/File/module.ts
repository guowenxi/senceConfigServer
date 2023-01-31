import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from '@/modules/entities/File';

@Module({
  imports: [
    TypeOrmModule.forFeature([File]), //方法定义在当前范围中注册哪些存储库
  ],
  controllers: [AppController],
  providers: [service],
})
export class FileController {}
