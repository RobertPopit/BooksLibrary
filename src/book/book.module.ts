import { Module } from "@nestjs/common";
import { Book } from "./entity/book.entity";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { CategoryModule } from "src/category/category.module";

@Module({
    imports: [Book,],
    controllers: [BookController],
    providers: [BookService],
})
export class BookModule { }