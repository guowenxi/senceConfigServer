import { codeFn } from '@/EvalCode/codeFn';
import { ScheduleList } from '@/modules/entities/ScheduleList';
import { ScheduleManager } from '@/modules/entities/ScheduleManager';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { createJob, regroupTime } from '@/util/util';
import { Repository } from 'typeorm';
import { relative } from 'path';

@Injectable()
export class AppService extends codeFn implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(ScheduleManager)
    private scheduleManager: Repository<ScheduleManager>,
    @InjectRepository(ScheduleList)
    private scheduleList: Repository<ScheduleList>,
    private schedulerRegistry: SchedulerRegistry,
  ){super();}
  async onApplicationBootstrap(): Promise<void>  {

    //自动开启计划任务
    const data = await this.scheduleList.findAndCount();
    data[0].map(async (item)=>{
      if(item.execute == "0") return ;
      const _item = await this.scheduleManager.findOne(item.cronId,{relations: ['warnManagers']});
      const job = createJob(
        item.cronName,
        _item.codeData || "",
        item,
        item.loopState,
        this,
        _item.socketList,
        _item.warnManagers,
      )
      console.log(`${item.cronName}任务开启`);
      job.start();
    })
  }
}

