import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ScheduleManager } from "./ScheduleManager";

@Entity("warn_manager", { schema: "nest" })
export class WarnManager {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "warn_name", length: 255 })
  warnName: string;

  @Column("varchar", { name: "warn_id", length: 255 })
  warnId: string;


  @Column("varchar", { name: "warn_text", length: 255 })
  warnText: string;

  @Column("varchar",{ name: "schedule_id"})
  scheduleId: string;

  @ManyToOne(
    () => ScheduleManager,
    (scheduleManager) => scheduleManager.warnManagers,
    { 

      createForeignKeyConstraints:false
     }
  )
  @JoinColumn([{ name: "schedule_id", referencedColumnName: "id" }])
  schedule: ScheduleManager;
}
