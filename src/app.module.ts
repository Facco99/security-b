import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }),
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: process.env.DB_user,
    password: process.env.DB_password,
    database: 'sicurezza',
    entities: [],
    synchronize: true,
    keepConnectionAlive: true,
  }),
    ArticleModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
