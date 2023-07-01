import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  async findAll() {
    return await this.prisma.article.findMany({ where: { published: true } });
  }

  async findOne(id: number) {
    return await this.prisma.article.findUnique({ where: { id } });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
