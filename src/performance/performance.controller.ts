import {Body, Controller, Get, Logger, Param, Post, Query} from "@nestjs/common";
import { PerformanceService } from "./performance.service";
import {
  ApiBody,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse, ApiTags
} from "@nestjs/swagger";
import { ResponseDto, ResponseListDto } from "../global/DTO/response.dto";
import { PaginationDto } from "../global/DTO/pagination.dto";
import {PerformanceFilterDTO} from "./performance.entity";

@ApiTags('공연/전시 🍿')
@Controller('performance')
export class PerformanceController {
  logger: Logger;

  constructor(
    private performanceService: PerformanceService,
  ) {
    this.logger = new Logger();
    this.performanceService = performanceService;
  }

  @ApiOperation({summary: '공연/전시 데이터 전체 조회 (아이디 참고 용)'})
  @ApiOkResponse({ type: ResponseListDto, description: '공연/전시 리스트' })
  @Get('')
  async findAll(
    @Query() pagination: PaginationDto
  ): Promise<any> {
    const performances = await this.performanceService.findAll(pagination);
    return Object.assign({
      page: pagination.getPageNum(),
      count: performances.length,
      statusCode: 200,
      statusMsg: `성공`,
      data: performances,
    });
  }

  @ApiParam({
    name: 'performanceId',
    required: true,
    description: '조회할 공연 아이디',
    example: 1
  })
  @ApiOperation({summary: '공연/전시 데이터 상세 조회'})
  @ApiOkResponse({ type: ResponseDto, description: '공연/전시 데이터' })
  @Get('/detail/:performanceId')
  async find(@Param('performanceId') id: number): Promise<any> {
    const performance = await this.performanceService.find(id);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: performance,
    });
  }

  @ApiParam({
    name: 'collectionName',
    required: true,
    description: '조회할 공연 컬렉션 이름',
    example: 'test'
  })
  @ApiOperation({summary: '공연/전시 큐레이션 데이터 조회 (개발중)', description: '아직 작업중!! 우선은 collectionName 아무거나 넣어도 공연 5개 나오게 되어있습니다'})
  @ApiOkResponse({ type: ResponseListDto, description: '공연/전시 큐레이션 데이터 리스트' })
  @Get('/collection/:collectionName')
  async findCollection(@Param('collectionName') collection: string): Promise<any> {
    const performances = await this.performanceService.findCollection(collection, 1);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: performances,
    });
  }

  @ApiOperation({summary: '필터 항목 조회', description: '필터로 걸 수 있는 지역/카테고리 리스트입니다. (** 엔드포인트 변경될 수 있음)'})
  @ApiOkResponse({ type: ResponseListDto, description: '필터 리스트' })
  @Get('/filter/getFilterList')
  async findFilter(): Promise<any> {
    const filters = await this.performanceService.findFilter();
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: filters,
    });
  }

  @ApiBody({
    type: PerformanceFilterDTO,
    required: true,
    description: '필터걸 항목 request body'
  })
  @ApiOperation({summary: '필터링된 공연/전시 데이터 조회', description: '필터로 걸 수 있는 카테고리/지역은 /filter api로 확인해주세요 (**칼럼명 앞에 performance_ 는 삭제할 예정입니다.)' +
      '\n\n카테고리/지역 중 하나만 거는 경우 없는 애는 빈배열 or 아예 안넘겨줘도 상관 없습니다.'})
  @ApiOkResponse({ type: ResponseListDto, description: '필터링된 공연/전시 데이터 리스트' })
  @Post('/filter')
  async filter(@Body('category') category: string[], @Body('area') area: string[]): Promise<any> {
    const performances = await this.performanceService.findFilteredList(category, area);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: performances,
    });
  }

  @ApiParam({
    name: 'term',
    required: true,
    description: '검색어',
    example: '뮤지컬'
  })
  @ApiOperation({summary: '검색된 공연/전시 데이터 조회', description: '공연 이름, 장소, 카테고리로 검색됩니다. (**기획의도 확인 필요)'})
  @ApiOkResponse({ type: ResponseListDto, description: '검색된 공연/전시 데이터 리스트' })
  @Get('/search/:term')
  async search(@Param('term') term: string): Promise<any> {
    const performances = await this.performanceService.search(term);
    return Object.assign({
      statusCode: 200,
      statusMsg: `성공`,
      data: performances,
    });
  }
}
