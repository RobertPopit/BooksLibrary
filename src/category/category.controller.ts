
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CategoriesService } from "./category.service";
import { CategoryDto } from "./dto/category.dto";
import { Category } from "./entity/category.entity";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('categories')
@Controller('categories')
export class CategoryController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) { }


    @ApiOperation({ summary: 'Create a new category' })
    @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: Category })
    @Post()
    async create(@Body() createCategoryDto: CategoryDto): Promise<Category> {
        return this.categoriesService.create(createCategoryDto)
    }


    @ApiOperation({ summary: 'Get all categories with their associated books' })
    @ApiResponse({ status: 200, description: 'List of all categories', type: [Category] })
    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoriesService.findAll();
    }


    @ApiOperation({ summary: 'Get a category by id' })
    @ApiParam({ name: 'id', description: 'Id of the category' })
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.findOne(id);
    }


    @ApiOperation({ summary: 'Update a category by id' })
    @ApiParam({ name: 'id', description: 'Id of the category' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() updateCategoryDto: CategoryDto): Promise<Category> {
        return this.categoriesService.update(id, updateCategoryDto);
    }


    @ApiOperation({ summary: 'Delete a category by id' })
    @ApiParam({ name: 'id', description: 'Id of the category' })
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<Category> {
        return this.categoriesService.remove(id);
    }

}