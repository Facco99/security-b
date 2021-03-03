import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async create(
    createArticleDto: CreateArticleDto,
    imageName: string,
    imageSource: Buffer,
  ) {
    const createArticle = this.articleRepository.create({
      ...createArticleDto,
      image: Buffer.from(imageSource),
      imageName,
      createdAt: new Date(),
    });

    const article = await this.articleRepository.save(createArticle);
    return { ...article, imagesrc: article.image.toString('base64') };
  }

  async findAll() {
    const articles = await this.articleRepository.find();
    return articles.map((article) => ({
      ...article,
      imagesrc: article.image.toString('base64'),
    }));
  }

  async findOne(id: number) {
    const articleById = await this.articleRepository.findOne(id);
    if (articleById)
      return { ...articleById, imagesrc: articleById.image.toString('base64') };
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: `article not found for provided id:${id}`,
      },
      HttpStatus.FORBIDDEN,
    );
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    await this.articleRepository.update(id, updateArticleDto);
    return this.findOne(id);
  }

  async remove(id: number) {
    const deleteArticle = await this.findOne(id);

    this.articleRepository.delete(deleteArticle);
  }
}
