import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, RelationId, ManyToOne } from "typeorm";
import {Archive} from "../../archive/archive.entity";

@Entity({ synchronize: true })
export class ArchiveImage {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Archive, (archive) => archive.images, { onDelete: 'SET NULL' })
  archive: Archive

}
