import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("schedule_list", { schema: "nest" })
export class ScheduleList {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "cronName", length: 255 })
  cronName: string;

  @Column("varchar", { name: "execute", length: 255 })
  execute: string;

  @Column("int", { name: "cronId" })
  cronId: number;

  @Column("varchar", { name: "start", length: 255 })
  start: string;

  @Column("varchar", { name: "end", length: 255 })
  end: string;

  @Column("varchar", { name: "cron", length: 255 })
  cron: string;

  @Column("varchar", { name: "loopState", length: 255 })
  loopState: string;
}
