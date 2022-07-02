import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Wish } from "../wish/wish.entity";
import {Archive} from "../archive/archive.entity";

@Entity({ synchronize: true })
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  nickname: string;

  @Column()
  age: number;

  @Column()
  gender: string;

  @OneToMany(type => Wish, wish => wish.user)
  wishes: Wish[];

  @OneToMany(type => Archive, archive => archive.user)
  archive: Archive[];

  // TODO: reviews 추가
}
