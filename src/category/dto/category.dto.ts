import { IsBoolean, IsNotEmpty, IsString } from "class-validator";


export class CategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString()
    description: string

    @IsBoolean()
    isActive: string

}