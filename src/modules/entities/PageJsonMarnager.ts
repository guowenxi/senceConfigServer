import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("sence_uuid", ["senceId"], {})
@Entity("page_json_marnager", { schema: "nest" })
export class PageJsonMarnager {
  @Column("longtext", { name: "json", nullable: true })
  json: string | null;

  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

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
