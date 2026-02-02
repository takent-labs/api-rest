import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpDto {

    @IsString()
    @IsNotEmpty()
    @MaxLength(50, { message: 'El nombre de usuario no puede exceder los 50 caracteres' })
    @MinLength(3, { message: 'El nombre de usuario debe tener al menos 3 caracteres' })
    username: string;

    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255, { message: 'El correo no puede exceder los 255 caracteres' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(128, { message: 'La contraseña no puede exceder los 128 caracteres' })
    password: string;

    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'El nombre no puede exceder los 50 caracteres' })
    firstName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(50, { message: 'El apellido no puede exceder los 50 caracteres' })
    lastName?: string;
}
