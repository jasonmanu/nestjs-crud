import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CreateArticleDto, ReadArticleDto, UpdateArticleDto } from './dto';

@ApiTags('articles')
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ReadArticleDto })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return await this.articlesService.create(createArticleDto);
  }

  @Get()
  @ApiOkResponse({ type: ReadArticleDto, isArray: true })
  async findAll() {
    return await this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ type: ReadArticleDto, isArray: true })
  async getDrafts() {
    return await this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ReadArticleDto })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.articlesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ReadArticleDto })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ReadArticleDto })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.articlesService.remove(+id);
  }
}
