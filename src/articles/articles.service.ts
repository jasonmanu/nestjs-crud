import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async findDrafts() {
    return await this.prisma.article.findMany({ where: { published: false } });
  }

  async create(createArticleDto: CreateArticleDto) {
    return await this.prisma.article.create({ data: createArticleDto });
  }

  async findAll() {
    return await this.prisma.article.findMany({
      where: { published: true },
      include: { author: true },
    });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!article) {
      throw new NotFoundException();
    }

    return article;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: { author: true },
    });

    if (!article) {
      throw new NotFoundException();
    }

    return await this.prisma.article.update({
      data: updateArticleDto,
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.article.delete({
      where: { id },
      include: { author: true },
    });
  }
}
