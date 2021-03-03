import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [ArticleController],
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService],
})
export class ArticleModule {}
