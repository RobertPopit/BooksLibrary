import { Controller, Post, Get, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { BookService } from "./book.service";
import { CreateBookDto } from './dto/create-book.dto';
import { Book } from './entity/book.entity';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiOperation, ApiParam } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('books')
export class BooksController {
    constructor(private readonly bookService: BookService) { }


    @Post(':categoryId')
    @ApiOperation({ summary: 'Create a new book in a specific category' })
    @ApiParam({ name: 'categoryId', description: 'Id of the category', type: String })
    async create(
        @Param('categoryId') categoryId: string,
        @Body() createBookDto: CreateBookDto,
    ): Promise<Book> {
        return this.bookService.create(createBookDto, categoryId);
    }


    @Put(':id')
    @ApiOperation({ summary: 'Update an existing book' })
    @ApiParam({ name: 'id', description: 'Id of the book' })
    async update(
        @Param('id') id: string,
        @Body() updateBookDto: UpdateBookDto,
    ): Promise<Book> {
        return this.bookService.update(id, updateBookDto);
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete a book by id' })
    @ApiParam({ name: 'id', description: 'Id of the book' })
    async remove(@Param('id') id: string): Promise<Book> {
        return await this.bookService.remove(id);
    }


    @Get('/category/:categoryId')
    @ApiOperation({ summary: 'Get all books by category Id' })
    @ApiParam({ name: 'categoryId', description: 'Id of the category' })
    async findBooksByCategory(@Param('categoryId') categoryId: string, @Query() options: IPaginationOptions,) {
        return this.bookService.findBooksByCategoryPaginate(categoryId, options);
    }
}