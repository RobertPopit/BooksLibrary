import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { BookModule } from './book/book.module';
import { CategoryModule } from './category/category.module';
import { Book } from './book/entity/book.entity';
import { Category } from './category/entity/category.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    BookModule,
    CategoryModule,
    Book,
    Category
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
