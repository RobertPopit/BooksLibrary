import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


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

}