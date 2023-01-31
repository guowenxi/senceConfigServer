import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { WarnManager } from "./WarnManager";

@Entity("schedule_manager", { schema: "nest" })
export class ScheduleManager {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", comment: "名称", length: 255 })
  name: string;

  @Column("varchar", {
    name: "execute",
    comment: "开启或者关闭 0/1",
    length: 255,
  })
  execute: string;

  @Column("varchar", {
    name: "describe",
    nullable: true,
    comment: "描述",
    length: 255,
  })
  describe: string | null;

  @Column("tinyint", {
    name: "triggerState",
    comment: "执行一次或者循环执行",
    width: 1,
  })
  triggerState: boolean;

  @Column("varchar", {
    name: "daySetting",
    nullable: true,
    comment: "周选择 1-7",
    length: 255,
  })
  daySetting: string | null;

  @Column("varchar", {
    name: "timeSetting",
    nullable: true,
    comment: "时间段选择",
    length: 255,
  })
  timeSetting: string | null;

  @Column("mediumtext", { name: "codeData", nullable: true, comment: "代码" })
  codeData: string | null;

  @Column("varchar", {
    name: "loopState",
    nullable: true,
    comment: "代码执行方式 1 执行一次 2 循环执行",
    length: 255,
  })
  loopState: string | null;

  @Column("mediumtext", {
    name: "scheduleJson",
    nullable: true,
    comment: "保存bolckly的代码",
  })
  scheduleJson: string | null;

  @Column("varchar", {
    name: "socketList",
    nullable: true,
    comment: "保存所有blockly内的点位id",
    length: 255,
  })
  socketList: string | null;

  @OneToMany(
    () => WarnManager,
    (warnManager) => warnManager.schedule,
    {
      cascade:true ,
      onDelete: 'CASCADE',
      onUpdate:'CASCADE',
    }
    )
  warnManagers: WarnManager[];
}
