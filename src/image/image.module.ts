import { Module } from '@nestjs/common';
import { ImageService } from './image.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Archive} from "../archive/archive.entity";
import {ArchiveImage} from "./entity/archiveImage.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([Archive, ArchiveImage]),
  ],
  providers: [ImageService]
})
export class ImageModule {}
