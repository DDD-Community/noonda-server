import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, RelationId, ManyToOne } from "typeorm";
import { Wish } from "../wish/wish.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ synchronize: false })
export class Performance {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  seq: number;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  place: string;

  @Column({nullable: true})
  category: string;

  @Column({nullable: true})
  area: string;

  @Column()
  thumbnail: string;

  @Column()
  price: string;

  @Column()
  link: string;

  @Column()
  gps_x: number;

  @Column()
  gps_y: number;

  @Column({default: 0})
  views: number;

  @OneToMany(type => Wish, wish => wish.performance)
  wishes: number[];
}

export class PerformanceDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  start_date: Date;

  @ApiProperty()
  end_date: Date;

  @ApiProperty()
  place: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  area: string;

  @ApiProperty()
  thumbnail: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  link: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  wishes: number;
}

export class PerformanceFilterDTO {

  @ApiProperty({example: ['연극']})
  category: string[];

  @ApiProperty({example: ['서울']})
  area: string[];
}
