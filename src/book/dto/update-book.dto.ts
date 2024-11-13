import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsNotEmpty, IsPositive, Min, Max, IsOptional, Length, IsUUID } from 'class-validator';


export class UpdateBookDto {
    @ApiProperty({ example: 'Stefan cel Mare' })
    @IsString()
    @Length(1, 255)
    @IsOptional()
    name: string;

    @ApiProperty({ example: 'Mihai Eminescu' })
    @IsString()
    @Length(1, 255)
    @IsOptional()
    author: string;

    @ApiProperty({ example: 1925 })
    @IsInt()
    @IsPositive()
    @Max(new Date().getFullYear())
    @IsOptional()
    publishedYear: number;

    @ApiProperty({ example: 180 })
    @IsInt()
    @IsPositive()
    @IsOptional()
    pages: number;

    @ApiProperty({ example: '5ed2eddd-4969-4581-b084-d48eacb1af13' })
    @IsOptional()
    @IsUUID()
    categoryId: string
}
