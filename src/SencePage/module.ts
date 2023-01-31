import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageJsonMarnager } from '@/modules/entities/PageJsonMarnager';
import { PageMapMarnager } from '@/modules/entities/PageMapMarnager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([PageJsonMarnager,PageMapMarnager]),
  ],
  controllers: [AppController],
  providers: [
    service,
  ],
})
export class SencePageController {}
