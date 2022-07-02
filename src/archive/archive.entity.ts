import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import {ArchiveImage} from "../image/entity/archiveImage.entity";
import {User} from "../user/user.entity";
import {ApiProperty} from "@nestjs/swagger";

@Entity({ synchronize: true })
export class Archive {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  performance_name: string;

  @Column()
  content: string;

  @Column()
  category: string;

  @Column()
  cover: string;

  @Column()
  date: Date;

  @OneToMany(() => ArchiveImage, (images) => images.archive, { nullable: true, cascade: ['insert', 'update'] })
  images: ArchiveImage[];

  @ManyToOne(() => User, (user) => user.archive)
  user: User

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
  created_at: Date;

  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updated_at: Date;
}

export class ArchiveSaveRequestDTO {
  @ApiProperty({description: '아카이브 제목', example: '내 아카이브를 받아라'})
  title: string;

  @ApiProperty({description: '공연 이름', example: '눈물의 똥꼬쇼'})
  performance_name: string;

  @ApiProperty({description: '공연 관람일', example: '2022-06-04'})
  date: Date;

  @ApiProperty({description: '아카이브 내용', example: '즐거웠다. 다음에 또 만나자'})
  content: string;

  @ApiProperty({description: '아카이브 카테고리', example: '전시'})
  category: string;

  @ApiProperty({description: '커버 이미지', example: 'www.sdfkmsflkvm'})
  cover: string;

  @ApiProperty({description: '아카이브 이미지 목록', example: ['www.spiofvos', 'www.sdfkmsflkvm']})
  images: string[];
}
