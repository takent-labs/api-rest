import { IsArray, IsNotEmpty, IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000, { message: 'El contenido no puede exceder los 1000 caracteres' })
    content: string;

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    hashtags?: string[];

    @IsString()
    @IsOptional()
    @MaxLength(1000, { message: 'La URL de la imagen no puede exceder los 1000 caracteres' })
    imageUrl?: string;
}
