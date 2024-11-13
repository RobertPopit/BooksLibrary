import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID } from "class-validator";


export class CategoryDto {

    @ApiProperty({ example: 'Istorie', description: 'The name of the category' })
    @IsString()
    @IsNotEmpty()
    name: string

    @ApiProperty({ example: 'Contine istoria Romaniei' })
    @IsString()
    description: string

    @ApiProperty({ default: false })
    @IsBoolean()
    isActive: boolean

    @ApiProperty({ default: '' })
    @IsUUID()
    @IsOptional()
    parentId: string

}