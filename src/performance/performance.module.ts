import { HttpModule, Module } from "@nestjs/common";
import { PerformanceController } from './performance.controller';
import { PerformanceService } from './performance.service';
import { Performance } from "./performance.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forFeature([Performance]),
  ],
  controllers: [PerformanceController],
  providers: [PerformanceService]
})
export class PerformanceModule {}
