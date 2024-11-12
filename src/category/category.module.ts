import { Module } from "@nestjs/common";
import { Category } from "./entity/category.entity";
import { CategoryController } from "./category.controller";
import { BookModule } from "src/book/book.module";
import { CategoriesService } from "./category.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    controllers: [CategoryController],
    providers: [CategoriesService],
})
export class CategoryModule { }