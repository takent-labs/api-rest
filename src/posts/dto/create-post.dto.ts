import { IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreatePostDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000, { message: 'El contenido no puede exceder los 1000 caracteres' })
    content: string;

    @IsString()
    @IsOptional()
    @MaxLength(1000, { message: 'La URL de la imagen no puede exceder los 1000 caracteres' })
    imageUrl?: string;
}
