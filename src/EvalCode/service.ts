import { Injectable, Logger } from '@nestjs/common';
import { Repository, getConnection, In  ,Connection} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ScheduleManager } from '@/modules/entities/ScheduleManager';
import { ScheduleList } from '@/modules/entities/ScheduleList';
import { WarnManager } from '@modules/entities/WarnManager';


import { HttpService } from '@nestjs/axios';
import { SchedulerRegistry, Cron, Interval } from '@nestjs/schedule';
import {
  regroupTime,
  createJob,
  repositoryWhereLike,
  commonData,
  resetScheduler,
} from "@/util/util"
import { codeFn } from "./codeFn"


@Injectable()
export class service extends codeFn {
  constructor(
    @InjectRepository(ScheduleManager)
    private scheduleManager: Repository<ScheduleManager>,
    @InjectRepository(ScheduleList)
    private scheduleList: Repository<ScheduleList>,
    @InjectRepository(WarnManager)
    private warnManager: Repository<WarnManager>,
    private schedulerRegistry: SchedulerRegistry,
  ) { super(); }
  private readonly logger = new Logger(service.name);
  async evalCode(data): Promise<any> {
    const { codeData } = data;
    const temp = `
    const _this = this;
    async function start(){
        ${codeData}
      };
      start.call(this)`
    try {
      eval(temp)
    } catch (err) {
      return {
        success: 0,
        message: err
      }
    }
  }

  async getSCheduleList(data): Promise<any> {
    const { pageNo = 1, pageSize = 10, name } = data;
    let [list, total] = await this.scheduleManager.findAndCount({
      where: repositoryWhereLike(name),
      skip: (pageNo - 1) * pageSize,
      take: pageSize,
      relations: ['warnManagers'],
    });
    list.map((item, idx) => {
      delete item.codeData;
      delete item.scheduleJson;
      // delete item.socketList;
    })
    return {
      pageNo: Number(pageNo),
      pageSize: Number(pageSize),
      list: list,
      total: total
    }
  }

  async createSChedule(data): Promise<any> {
    const { id, name, codeData, loopState } = data;
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      //新增
      const instance = await this.scheduleManager
        .createQueryBuilder(null, queryRunner)
        .insert()
        .into(ScheduleManager)
        .values(data)
        .execute();
      const listId = instance.generatedMaps[0].id;
      data.id = listId;
      //新增计划任务
      const cronList = await this.scheduleList.find({
        where: {
          cronId: id
        },
      });
      //新增计划任务
      const timerList = resetScheduler.call(this, {
        data: data,
        execute: '1',
        removeList: cronList,
      });
      //批量插入到表
      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .insert()
        .into(ScheduleList)
        .values(timerList)
        .execute();
      await queryRunner.commitTransaction();
      queryRunner.release();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      return {
        success: 0,
        message: err.message,
      };
    }
    return {
      message: "新增成功",
    }
  }

  async updateSChedule(data): Promise<any> {
    const { id, ...otherData } = data;
    //删除 rbacToken 
    delete otherData.rbacToken;
    //新增
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      //新增

      // const _ = await this.scheduleManager
      //   .createQueryBuilder("scheduleManager", queryRunner)
      //   // .leftJoin("scheduleManager.warnManagers", "schedule")
      //   .update()
      //   .set({ ...otherData})
      //   // .where("scheduleManager.id = :id", { id: id })
      //   .where("id = :id", { id: id })
        
      //   .execute();
        // .relation(WarnManager, "warnManagers")
        // .of({ id: id })
        // .update()
        // .set(otherData.warnManagers)
        // .execute();
      // const __ = await this.warnManager.save(otherData.warnManagers);
      

      const instance = await this.scheduleManager.findOne(id,{relations: ['warnManagers']});
      const cronList = await this.scheduleList.find({
        where: {
          cronId: id
        },
      });
      //更新计划任务
      const timerList = resetScheduler.call(this, {
        data:{
          ...instance,
          ...otherData,
        },
        execute: otherData.execute,
        removeList: cronList,
      });
      //批量插入到表
      //批量更新数据
      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .delete()
        .from(ScheduleList)
        .where("cronId = :id", { id: id })
        .execute();
      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .insert()
        .into(ScheduleList)
        .values(timerList)
        .execute();
      await queryRunner.commitTransaction();
      queryRunner.release();

      //最后进行保存
      const __ = await this.scheduleManager.update(id,{
        daySetting:otherData.daySetting,
        describe:otherData.describe,
        execute:otherData.execute,
        loopState:otherData.loopState,
        name:otherData.name,
        socketList:otherData.socketList,
        timeSetting:otherData.timeSetting,
        triggerState:otherData.triggerState,
      });

      return {
        message: '保存成功',
      };

    } catch (err) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      return {
        message: err.message,
        success: 0
      };
    }
  }

  async deleteSCheduleList(data): Promise<any> {
    const { id } = data;
    const _ids = id.split(",");
    //先清空计划任务
    const cronList = await this.scheduleList.find({
      cronId: In([..._ids])
    });

    resetScheduler.call(this, {
      data: null,
      execute: 1,
      removeList: cronList
    });
    //删除
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ScheduleManager)
      .where(`id IN (${id})`)
      .execute();
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(ScheduleList)
      .where(`cronId IN (${id})`)
      .execute();
    return {}
  }

  async executeSChedule(data): Promise<any> {
    const { id, execute } = data;
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      await this.scheduleManager
        .createQueryBuilder(null, queryRunner)
        .update(ScheduleManager)
        .set({
          execute: execute
        })
        .where("id = :id", { id: id })
        .execute();
      const instance = await this.scheduleManager.findOne(id,{relations: ['warnManagers']});
      const cronList = await this.scheduleList.find({
        where: {
          cronId: id
        },
      });
      //更新计划任务
      const timerList = resetScheduler.call(this, {
        data: instance,
        execute: execute,
        removeList: cronList,
      });

      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .update(ScheduleList)
        .set({ execute: execute })
        .where("cronId = :id", { id: id })
        .execute();
      await queryRunner.commitTransaction();
      queryRunner.release();
      return {
        message: execute == 0 ? "任务已关闭" : "开始执行任务",
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      return {
        message: err.message,
        success: 0
      };
    }
  }

  async getSCheduleBlockly(data): Promise<any> {
    const { id } = data;
    try {
      let _scheduleManager = await this.scheduleManager.findOne(id,{relations: ['warnManagers']});
      return {
        data: {
          scheduleJson : _scheduleManager.scheduleJson,
          warnList:_scheduleManager.warnManagers,
        }
      };
    } catch (err) {
      return {
        message: err.message,
        success: 0
      };
    }

  }

  //保存代码块
  async saveSCheduleBlockly(data): Promise<any> {
    const { id, scheduleJson, codeData ,socketList ,warnList } = data;
    const queryRunner = getConnection().createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      //新增
      
      const res = await this.scheduleManager
        .createQueryBuilder(null, queryRunner)
        .update()
        .set({
          scheduleJson: scheduleJson,
          codeData: codeData,
          socketList:socketList,
        })
        .where("id = :id", { id: id })
        .execute();

        const instance = await this.scheduleManager.findOne(id,{
          relations: ['warnManagers']
        });
        let _warnManager = await this.warnManager.find();

        warnList.map(item => {
          item.id = null;
          item.scheduleId = id;
          item.name  = `${instance.name}-${item.warnName}`;
          item.warnText = item.warnText || '';
        })
        //先删后增
        await this.warnManager
        .createQueryBuilder(null, queryRunner)
        .where("scheduleId = :id", { id: id })
        .delete()
        .from(WarnManager)
        .execute();
      await this.warnManager
        .createQueryBuilder(null, queryRunner)
        .insert()
        .into(WarnManager)
        .values(warnList)
        .execute();


      const cronList = await this.scheduleList.find({
        where: {
          cronId: id
        },
      });
      //更新计划任务
      instance.codeData = codeData;
      instance.socketList = socketList;
      let timerList = resetScheduler.call(this, {
        data: instance,
        execute: instance.execute,
        removeList: cronList,
      });
      //批量插入到表
      //批量更新数据
      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .delete()
        .from(ScheduleList)
        .where("cronId = :id", { id: id })
        .execute();
      await this.scheduleList
        .createQueryBuilder(null, queryRunner)
        .insert()
        .into(ScheduleList)
        .values(timerList)
        .execute();
      // await this.WarnManager
      //   .createQueryBuilder(null, queryRunner)
      //   .insert()
      //   .into(WarnManager)
      //   .values(warnList)
      //   .execute();
      await queryRunner.commitTransaction();
      queryRunner.release();


      return {
        message: '保存成功',
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      queryRunner.release();
      return {
        message: err.message,
        success: 0
      };
    }

  }

  //获取告警列表
  async getSCheduleWarningList(data): Promise<any> {
    const {  } = data;
    try {
      let _warnManager = await this.warnManager.find();
      return {
        data: _warnManager
      };
    } catch (err) {
      return {
        message: err.message,
        success: 0
      };
    }
  }

  //推送告警
  async sendWarn(data): Promise<any> {
    const { blockId } = data;
    try {
      let _warnManager = await this.warnManager.find();
      return {
        data: _warnManager
      };
    } catch (err) {
      return {
        message: err.message,
        success: 0
      };
    }
  }

}
