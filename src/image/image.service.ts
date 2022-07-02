import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {ArchiveImage} from "./entity/archiveImage.entity";

@Injectable()
export class ImageService {
  logger: Logger;

  constructor(
    @InjectRepository(ArchiveImage) private archiveImageRepository: Repository<ArchiveImage>,
  ) {
    this.logger = new Logger();
    this.archiveImageRepository = archiveImageRepository;
  }

  /**
   * 아카이브 이미지 리스트 저장
   */
  async saveArchiveImages(images): Promise<void> {
    this.logger.log('archive 저장');

    await this.archiveImageRepository.save(images);
  }
}
