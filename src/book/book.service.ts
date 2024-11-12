import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entity/book.entity";
import { Category } from "src/category/entity/category.entity";
import { CreateBookDto } from "./dto/book.dto";


@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,

        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }

    async create(createBookDto: CreateBookDto, categoryId: string): Promise<Book> {

        const existingBook = await this.bookRepository.findOne({ where: { name: createBookDto.name } });
        if (existingBook) {
            throw new ConflictException('Book with this name already exists');
        }

        const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        const book = this.bookRepository.create({
            ...createBookDto,
            category,
        });

        return this.bookRepository.save(book);
    }
}