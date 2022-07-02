import { Inject, Injectable, Logger } from '@nestjs/common';
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  logger: Logger;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    this.logger = new Logger();
    this.userRepository = userRepository;
  }

  // TODO: jwt token 으로 변경하기
  async validate(userId: string): Promise<boolean> {
    const user: any = await this.userRepository.findOne(userId);
    return !!user;
  }
}
