import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./entity/category.entity";
import { Repository } from "typeorm";
import { CategoryDto } from "./dto/category.dto";

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>
    ) { }


    async create(createCategoryDto: CategoryDto): Promise<Category> {
        const existingCategory = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
        if (existingCategory) {
            throw new ConflictException('Category with this name already exists');
        }

        const category = this.categoryRepository.create(createCategoryDto);
        return this.categoryRepository.save(category);
    }


    async findAll(): Promise<Category[]> {
        return await this.categoryRepository.createQueryBuilder('category')
            .leftJoinAndSelect('category.books', 'book')
            .getMany();
    }


    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['books'] });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }


    async update(id: string, updateCategoryDto: CategoryDto): Promise<Category> {
        const category = await this.findOne(id);
        const existingCategory = await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } });
        if (existingCategory) {
            throw new ConflictException('Category with this name already exists');
        }

        Object.assign(category, updateCategoryDto);

        return this.categoryRepository.save(category);
    }


    async remove(id: string): Promise<Category> {
        const category = await this.findOne(id);
        await this.categoryRepository.delete(category.id);

        return category
    }

}