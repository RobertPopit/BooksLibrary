import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Book } from "./entity/book.entity";
import { Category } from "src/category/entity/category.entity";
import { CreateBookDto } from "./dto/create-book.dto";
import { UpdateBookDto } from "./dto/update-book.dto";
import { IPaginationOptions, paginate, Pagination } from "nestjs-typeorm-paginate";


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


    async update(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });

        if (updateBookDto.name) {
            const existingBook = await this.bookRepository.findOne({ where: { name: updateBookDto.name } });
            if (existingBook) {
                throw new ConflictException('Category with this name already exists');
            }
        }

        if (updateBookDto.categoryId) {
            const category = await this.categoryRepository.findOne({ where: { id: updateBookDto.categoryId } });
            if (!category) {
                throw new NotFoundException('Category not found');
            }
            book.category = category;
        }

        Object.assign(book, updateBookDto);
        return this.bookRepository.save(book);
    }


    async remove(id: string): Promise<Book> {
        const book = await this.bookRepository.findOne({ where: { id } });
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        await this.bookRepository.delete(id);
        return book
    }


    async findBooksByCategory(categoryId: string): Promise<Book[]> {
        const books = await this.bookRepository.find({
            where: { category: { id: categoryId } },
        });

        if (books.length === 0) {
            throw new NotFoundException('No books found for this category');
        }

        return books;
    }


    async findBooksByCategoryPaginate(
        categoryId: string,
        options: IPaginationOptions,
    ): Promise<Pagination<Book>> {
        const queryBuilder = this.bookRepository.createQueryBuilder('book')
            .where('book.categoryId = :categoryId', { categoryId })
            .orderBy('book.name', 'ASC');

        const paginatedBooks = await paginate<Book>(queryBuilder, options);

        if (paginatedBooks.items.length === 0) {
            throw new NotFoundException('No books found for this category');
        }

        return paginatedBooks;
    }
}