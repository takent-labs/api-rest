import { IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(100, { message: 'El título no puede exceder los 50 caracteres' })
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(1000, { message: 'El contenido no puede exceder los 1000 caracteres' })
    content: string;
}
