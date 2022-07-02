import {IsNumber, Max, Min} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export class PaginationDto {
  @IsNumber() @Min(1)
  @Type(() => Number)
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @ApiProperty({ description: '페이지 번호' })
  private readonly page: number = 1;

  @IsNumber() @Min(2) @Max(100)
  @Type(() => Number)
  @ApiPropertyOptional({
    minimum: 2,
    maximum: 100,
    default: 10,
  })
  @ApiProperty({ description: '페이지 당 개수(2~100)' })
  private readonly limit: number = 10;

  getPageNum(): number {
    return this.page;
  }

  getSkip(): number {
    return (this.page - 1) * this.limit;
  }

  getTake(): number {
    return this.limit;
  }
}
