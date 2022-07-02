import { ApiProperty } from "@nestjs/swagger";
import { PerformanceDTO } from "../../performance/performance.entity";

export class ResponseDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  statusMsg: string;

  @ApiProperty()
  data: PerformanceDTO;
}

export class ResponseListDto {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  statusMsg: string;

  @ApiProperty()
  page: number = 1;

  @ApiProperty()
  count: number = 10;

  @ApiProperty()
  data: PerformanceDTO[];
}
