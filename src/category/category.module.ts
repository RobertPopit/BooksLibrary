import { Module } from "@nestjs/common";
import { Category } from "./entity/category.entity";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { BookModule } from "src/book/book.module";

@Module({
    imports: [Category],
    controllers: [CategoryController],
    providers: [CategoryService],
})
export class CategoryModule { }