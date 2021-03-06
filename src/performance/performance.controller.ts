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

@ApiTags('๊ณต์ฐ/์ ์ ๐ฟ')
@Controller('performance')
export class PerformanceController {
  logger: Logger;

  constructor(
    private performanceService: PerformanceService,
  ) {
    this.logger = new Logger();
    this.performanceService = performanceService;
  }

  @ApiOperation({summary: '๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ์ ์ฒด ์กฐํ (์์ด๋ ์ฐธ๊ณ  ์ฉ)'})
  @ApiOkResponse({ type: ResponseListDto, description: '๊ณต์ฐ/์ ์ ๋ฆฌ์คํธ' })
  @Get('')
  async findAll(
    @Query() pagination: PaginationDto
  ): Promise<any> {
    const performances = await this.performanceService.findAll(pagination);
    return Object.assign({
      page: pagination.getPageNum(),
      count: performances.length,
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: performances,
    });
  }

  @ApiParam({
    name: 'performanceId',
    required: true,
    description: '์กฐํํ  ๊ณต์ฐ ์์ด๋',
    example: 1
  })
  @ApiOperation({summary: '๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ์์ธ ์กฐํ'})
  @ApiOkResponse({ type: ResponseDto, description: '๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ' })
  @Get('/detail/:performanceId')
  async find(@Param('performanceId') id: number): Promise<any> {
    const performance = await this.performanceService.find(id);
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: performance,
    });
  }

  @ApiParam({
    name: 'collectionName',
    required: true,
    description: '์กฐํํ  ๊ณต์ฐ ์ปฌ๋ ์ ์ด๋ฆ',
    example: 'test'
  })
  @ApiOperation({summary: '๊ณต์ฐ/์ ์ ํ๋ ์ด์ ๋ฐ์ดํฐ ์กฐํ (๊ฐ๋ฐ์ค)', description: '์์ง ์์์ค!! ์ฐ์ ์ collectionName ์๋ฌด๊ฑฐ๋ ๋ฃ์ด๋ ๊ณต์ฐ 5๊ฐ ๋์ค๊ฒ ๋์ด์์ต๋๋ค'})
  @ApiOkResponse({ type: ResponseListDto, description: '๊ณต์ฐ/์ ์ ํ๋ ์ด์ ๋ฐ์ดํฐ ๋ฆฌ์คํธ' })
  @Get('/collection/:collectionName')
  async findCollection(@Param('collectionName') collection: string): Promise<any> {
    const performances = await this.performanceService.findCollection(collection, 1);
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: performances,
    });
  }

  @ApiOperation({summary: 'ํํฐ ํญ๋ชฉ ์กฐํ', description: 'ํํฐ๋ก ๊ฑธ ์ ์๋ ์ง์ญ/์นดํ๊ณ ๋ฆฌ ๋ฆฌ์คํธ์๋๋ค. (** ์๋ํฌ์ธํธ ๋ณ๊ฒฝ๋  ์ ์์)'})
  @ApiOkResponse({ type: ResponseListDto, description: 'ํํฐ ๋ฆฌ์คํธ' })
  @Get('/filter/getFilterList')
  async findFilter(): Promise<any> {
    const filters = await this.performanceService.findFilter();
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: filters,
    });
  }

  @ApiBody({
    type: PerformanceFilterDTO,
    required: true,
    description: 'ํํฐ๊ฑธ ํญ๋ชฉ request body'
  })
  @ApiOperation({summary: 'ํํฐ๋ง๋ ๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ์กฐํ', description: 'ํํฐ๋ก ๊ฑธ ์ ์๋ ์นดํ๊ณ ๋ฆฌ/์ง์ญ์ /filter api๋ก ํ์ธํด์ฃผ์ธ์ (**์นผ๋ผ๋ช ์์ performance_ ๋ ์ญ์ ํ  ์์ ์๋๋ค.)' +
      '\n\n์นดํ๊ณ ๋ฆฌ/์ง์ญ ์ค ํ๋๋ง ๊ฑฐ๋ ๊ฒฝ์ฐ ์๋ ์ ๋ ๋น๋ฐฐ์ด or ์์ ์๋๊ฒจ์ค๋ ์๊ด ์์ต๋๋ค.'})
  @ApiOkResponse({ type: ResponseListDto, description: 'ํํฐ๋ง๋ ๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ๋ฆฌ์คํธ' })
  @Post('/filter')
  async filter(@Body('category') category: string[], @Body('area') area: string[]): Promise<any> {
    const performances = await this.performanceService.findFilteredList(category, area);
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: performances,
    });
  }

  @ApiParam({
    name: 'term',
    required: true,
    description: '๊ฒ์์ด',
    example: '๋ฎค์ง์ปฌ'
  })
  @ApiOperation({summary: '๊ฒ์๋ ๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ์กฐํ', description: '๊ณต์ฐ ์ด๋ฆ, ์ฅ์, ์นดํ๊ณ ๋ฆฌ๋ก ๊ฒ์๋ฉ๋๋ค. (**๊ธฐํ์๋ ํ์ธ ํ์)'})
  @ApiOkResponse({ type: ResponseListDto, description: '๊ฒ์๋ ๊ณต์ฐ/์ ์ ๋ฐ์ดํฐ ๋ฆฌ์คํธ' })
  @Get('/search/:term')
  async search(@Param('term') term: string): Promise<any> {
    const performances = await this.performanceService.search(term);
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: performances,
    });
  }
}
