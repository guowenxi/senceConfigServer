import { Module } from '@nestjs/common';
import { AppController } from './controller';
import { service } from './service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleManager } from '@/modules/entities/ScheduleManager';
import { ScheduleList } from '@/modules/entities/ScheduleList';
import { WarnManager } from '@modules/entities/WarnManager';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ScheduleManager,
      ScheduleList,
      WarnManager,
    ]),
  ],
  controllers: [AppController],
  providers: [
    service,
  ],
})
export class EvalCodeController {}
