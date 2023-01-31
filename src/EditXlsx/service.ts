import { Injectable, Logger } from '@nestjs/common';
import { Repository, getConnection, In } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { SchedulerRegistry, Cron, Interval } from '@nestjs/schedule';
import { PageJsonMarnager } from '@/modules/entities/PageJsonMarnager';
import { PageMapMarnager } from '@/modules/entities/PageMapMarnager';
import { Not } from 'typeorm';
import { analysisXlsx ,createXlsx } from './util';
const xlsx  = require('node-xlsx');
@Injectable()
export class service {
  constructor(
    @InjectRepository(PageMapMarnager)
    private PageMapMarnager: Repository<PageMapMarnager>,
    @InjectRepository(PageJsonMarnager)
    private PageJsonMarnager: Repository<PageJsonMarnager>,
  ) { }

  async importXlsx(file): Promise<any> {
    try {
     const data = await analysisXlsx(file);
     /**
      * TODO operator sql code
      */
     return data ;
    } catch (err) {
      return {
        message: err.message,
        code: false
      };
    }
  }

  async exportXlsx(): Promise<any> {
    try {
      const list = [
        {
            name: "照明16-卫生间走廊",
            pointType: 3,
            registerType: 2,
            convertRatio: 1,
            convertBenchmark: 1,
            address: 13,
            dataType: 3,
            explain: 1,
        }
    ]
         /**
      * TODO operator sql code
      */
     const data = createXlsx(list);
     return data;
    } catch (err) {
      return {
        message: err.message,
        code: false
      };
    }
  }




}
