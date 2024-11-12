import { IsString, IsInt, IsNotEmpty, IsPositive, Min, Max, IsOptional, Length, IsUUID } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    author: string;

    @IsInt()
    @IsPositive()
    @Min(1000)
    @Max(new Date().getFullYear())
    publishedYear: number;

    @IsInt()
    @IsPositive()
    pages: number;
}