import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignInDto {
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(255, { message: 'El correo no puede exceder los 255 caracteres' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(128, { message: 'La contraseña no puede exceder los 128 caracteres' })
    password: string;
}
