import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsPositive, Min, Max, IsOptional, Length, IsUUID } from 'class-validator';

export class CreateBookDto {
    @ApiProperty({ example: 'Stefan cel Mare' })
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    name: string;

    @ApiProperty({ example: 'Mihai Eminescu' })
    @IsString()
    @IsNotEmpty()
    @Length(1, 255)
    author: string;

    @ApiProperty({ example: 1925 })
    @IsInt()
    @IsPositive()
    @Max(new Date().getFullYear())
    publishedYear: number;

    @ApiProperty({ example: 180 })
    @IsInt()
    @IsPositive()
    pages: number;
}