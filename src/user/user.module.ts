import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Wish} from "../wish/wish.entity";
import {Archive} from "../archive/archive.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Wish, Archive]),
  ],
  providers: [UserService]
})
export class UserModule {}
