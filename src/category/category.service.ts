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

        if (createCategoryDto.parentId) {
            const parentCategory = await this.categoryRepository.findOne({ where: { id: createCategoryDto.parentId } });
            if (!parentCategory) {
                throw new NotFoundException('Parent category not found');
            }
            category.parent = parentCategory;
        }

        return this.categoryRepository.save(category);
    }


    async findAll(): Promise<Category[]> {
        return this.categoryRepository.find({
            relations: ['books', 'subcategories'],
        });
    }



    async findOne(id: string): Promise<Category> {
        const category = await this.categoryRepository.findOne({ where: { id }, relations: ['books', 'subcategories'] });
        if (!category) {
            throw new NotFoundException('Category not found');
        }

        return category;
    }


    async update(id: string, updateCategoryDto: CategoryDto): Promise<Category> {
        const category = await this.findOne(id);

        if (updateCategoryDto.name && updateCategoryDto.name !== category.name) {
            const existingCategory = await this.categoryRepository.findOne({ where: { name: updateCategoryDto.name } });
            if (existingCategory && existingCategory.id !== id) {
                throw new ConflictException('Category with this name already exists');
            }
        }

        if (updateCategoryDto.parentId) {
            if (updateCategoryDto.parentId === id) {
                throw new ConflictException('A category cannot be its own parent');
            }

            const parentCategory = await this.categoryRepository.findOne({ where: { id: updateCategoryDto.parentId } });
            if (!parentCategory) {
                throw new NotFoundException('Parent category not found');
            }

            category.parent = parentCategory;
        } else {
            category.parent = null;
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