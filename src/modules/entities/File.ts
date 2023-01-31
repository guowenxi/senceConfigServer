import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("file", { schema: "nest" })
export class File {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "fileId", nullable: true, length: 255 })
  fileId: string | null;

  @Column("text", { name: "fileName", nullable: true })
  fileName: string | null;

  @Column("text", { name: "fileType", nullable: true })
  fileType: string | null;
}
