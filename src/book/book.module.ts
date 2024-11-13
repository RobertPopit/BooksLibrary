import { Module } from "@nestjs/common";
import { Book } from "./entity/book.entity";
import { BooksController } from "./book.controller";
import { BookService } from "./book.service";
import { CategoryModule } from "src/category/category.module";
import { Category } from "src/category/entity/category.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [
        TypeOrmModule.forFeature([Book, Category]),
    ],
    controllers: [BooksController],
    providers: [BookService],
})
export class BookModule { }