import {Injectable, Logger} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {Archive} from "./archive.entity";
import {Repository} from "typeorm";
import {ArchiveImage} from "../image/entity/archiveImage.entity";
import {User} from "../user/user.entity";

@Injectable()
export class ArchiveService {
  logger: Logger;

  constructor(
    @InjectRepository(Archive) private archiveRepository: Repository<Archive>,
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.logger = new Logger();
    this.archiveRepository = archiveRepository;
    this.userRepository = userRepository;
  }

  /**
   * 아카이브 리스트 조회
   */
  async findAll(userId: number): Promise<Archive[]> {
    this.logger.log('archive 데이터 전체 조회');
    return this.archiveRepository
      .createQueryBuilder('archive')
      .where('archive.user = :user', { user: userId })
      .getRawMany();
  }

  /**
   * 아카이브 저장
   */
  async save(archive): Promise<void> {
    this.logger.log('archive 저장');
    archive.user = await this.userRepository.findOne(1);
    archive.images = archive.images.map(i => {
      const image = new ArchiveImage();
      image.url = i;
      return image;
    });
    await this.archiveRepository.save(archive);
  }
}
