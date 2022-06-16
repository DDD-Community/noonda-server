import { Injectable, CanActivate, ExecutionContext, Logger } from "@nestjs/common";
import { UserService } from "../user/user.service";
import {InjectRepository} from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class AuthGuard implements CanActivate {
  logger: Logger;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    this.logger = new Logger();
  }

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return !!await this.userRepository.findOne(request.headers["user-authorization"]);
  }
}
