import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sence_id", ["senceId"], {})
@Entity("page_map_marnager", { schema: "nest" })
export class PageMapMarnager {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "sence_name", nullable: true, length: 255 })
  senceName: string | null;

  @Column("datetime", {
    name: "update_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateDate: Date;

  @Column("datetime", {
    name: "create_date",
    default: () => "CURRENT_TIMESTAMP",
  })
  createDate: Date;

  @Column("varchar", {
    name: "isDelete",
    nullable: true,
    length: 255,
    default: () => "'0'",
  })
  isDelete: string | null;

  @Column("varchar", { name: "sence_id", nullable: true, length: 255 })
  senceId: string | null;
}
