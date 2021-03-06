import {Body, Controller, Get, Logger, Post, Query} from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ArchiveService } from "./archive.service";
import { ResponseDto, ResponseListDto } from "../global/DTO/response.dto";
import {Archive, ArchiveSaveRequestDTO} from "./archive.entity";

@ApiTags('์์นด์ด๋น ๐ซ')
@Controller('archive')
export class ArchiveController {
  logger: Logger;

  constructor(
    private archiveService: ArchiveService,
  ) {
    this.logger = new Logger();
    this.archiveService = archiveService;
  }

  @ApiOperation({summary: '์ ์ ๋ณ ์์นด์ด๋ธ ์ ์ฒด ์กฐํ', description: 'ํ์ฌ๋ ์ง์ ๋ ์ ์ ๋ก ๋ถ๋ฌ์ต๋๋ค. ์ถํ jwt token ๋ฐ๊ธฐ!!' +
      '\n\nTODO: ์ด๋ชจํฐ์ฝ ์ ์ฅ ๊ฐ๋ฅํ๊ฒ ํ๊ธฐ..'})
  @ApiOkResponse({ type: ResponseListDto, description: '์์นด์ด๋ธ ๋ฆฌ์คํธ' })
  @Get('')
  async findAll(): Promise<any> {
    const archives = await this.archiveService.findAll(1);
    return Object.assign({
      count: archives.length,
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`,
      data: archives,
    });
  }

  @ApiOperation({summary: '์์นด์ด๋ธ ์ ์ฅ', description: 'ํ์ฌ๋ ์ง์ ๋ ์ ์ ๋ก ์ ์ฅ๋ฉ๋๋ค. ์ถํ jwt token ๋ฐ๊ธฐ!!'})
  @ApiOkResponse({ type: ResponseDto, description: '์์นด์ด๋ธ ์์ฑ ์ฑ๊ณต' })
  @Post('')
  async saveOne(
    @Body() archive: ArchiveSaveRequestDTO
  ): Promise<any> {
    const archives = await this.archiveService.save(archive);
    return Object.assign({
      statusCode: 200,
      statusMsg: `์ฑ๊ณต`
    });
  }
}
