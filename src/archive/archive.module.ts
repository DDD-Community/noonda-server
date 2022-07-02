import { Module } from '@nestjs/common';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Archive} from "./archive.entity";
import {ArchiveImage} from "../image/entity/archiveImage.entity";
import {User} from "../user/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive, ArchiveImage, User]),
  ],
  controllers: [ArchiveController],
  providers: [ArchiveService]
})
export class ArchiveModule {}
