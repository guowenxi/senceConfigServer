import { Injectable, Logger } from '@nestjs/common';
import { Repository, getConnection, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry, Cron, Interval } from '@nestjs/schedule';
import { PageJsonMarnager } from '@/modules/entities/PageJsonMarnager';
import { PageMapMarnager } from '@/modules/entities/PageMapMarnager';
import { Not } from 'typeorm';

@Injectable()
export class service {
  constructor(
    @InjectRepository(PageMapMarnager)
    private PageMapMarnager: Repository<PageMapMarnager>,
    @InjectRepository(PageJsonMarnager)
    private PageJsonMarnager: Repository<PageJsonMarnager>,
  ) { }

  async getSencePageList(data): Promise<any> {
    try {
      let instance = await this.PageMapMarnager.createQueryBuilder("PageMapMarnager")
        .where({
          isDelete: Not('1')
        })
        .getMany();
      return {
        data:instance
      };
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }
  async setSencePage(data): Promise<any> {
    try {
      const queryRunner = getConnection().createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //新增
        const instance = await this.PageMapMarnager
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(PageMapMarnager)
          .values([{
            senceName:data.senceName,
            senceId:data.senceId,
          }])
          .execute();
        await this.PageJsonMarnager
          .createQueryBuilder(null, queryRunner)
          .insert()
          .into(PageJsonMarnager)
          .values([{
            json:'[]',
            senceId:data.senceId
          }])
          .execute();
        await queryRunner.commitTransaction();
        queryRunner.release();
        return {};
      } catch (err) {
        await queryRunner.rollbackTransaction();
        queryRunner.release();
        return {
          message: err.message,
          success : 0
        };
      }
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }

  async updateSencePage(data): Promise<any> {
    try {
      const queryRunner = getConnection().createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //新增
        const instance = await this.PageMapMarnager
          .createQueryBuilder(null, queryRunner)
          .update(PageMapMarnager)
          .set({
            senceName: data.senceName,
          })
          .where("senceId = :senceId", { senceId: data.senceId })
          .execute();
        await queryRunner.commitTransaction();
        queryRunner.release();
        return {
          message: "更新成功",
        };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        queryRunner.release();
        return {
          message: err.message,
          success : 0
        };
      }
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }
  async deleteSencePage(data): Promise<any> {
    try {
      const queryRunner = getConnection().createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //新增
        const instance = await this.PageMapMarnager
          .createQueryBuilder(null, queryRunner)
          .update(PageMapMarnager)
          .set({
            isDelete: '1',
          })
          .where("senceId = :senceId", { senceId: data.senceId })
          .execute();
          await this.PageJsonMarnager
          .createQueryBuilder(null, queryRunner)
          .update(PageJsonMarnager)
          .set({
            isDelete: '1',
          })
          .where("senceId = :senceId", { senceId: data.senceId })
          .execute();
        await queryRunner.commitTransaction();
        queryRunner.release();
        return {
          message: "删除成功",
        };
      } catch (err) {
        await queryRunner.rollbackTransaction();
        queryRunner.release();
        return {
          message: err.message,
          success : 0
        };
      }
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }


  async getSencePageInfo(data): Promise<any> {
    try {
      let instance = await this.PageJsonMarnager.createQueryBuilder("PageJsonMarnager")
        .where("PageJsonMarnager.senceId = :senceId", { senceId: data.senceId })
        .getOne();
      return {
        data:instance
      };
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }

  async setSencePageInfo(data): Promise<any> {
    try {
      const queryRunner = getConnection().createQueryRunner();
      try {
        await queryRunner.connect();
        await queryRunner.startTransaction();
        //新增
        const instance = await this.PageJsonMarnager
          .createQueryBuilder(null, queryRunner)
          .update(PageJsonMarnager)
          .set({
            json: JSON.stringify(data.json),
          })
          .where("senceId = :senceId", { senceId: data.senceId })
          .execute();
        await queryRunner.commitTransaction();
        queryRunner.release();
        return instance;
      } catch (err) {
        await queryRunner.rollbackTransaction();
        queryRunner.release();
        return {
          message: err.message,
          success : 0
        };
      }
    } catch (err) {
      return {
        message: err.message,
        success : 0
      };
    }
  }
}
