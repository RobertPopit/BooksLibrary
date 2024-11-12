import { IsUUID } from "class-validator";
import { Category } from "src/category/entity/category.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('books')
export class Book {
    @PrimaryGeneratedColumn('uuid')
    @IsUUID()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    author: string;

    @Column()
    publishedYear: number;

    @Column()
    pages: number;

    @ManyToOne(() => Category, (category) => category.books)
    category: Category;

}