import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, IsUUID } from "class-validator";
import type { UUID } from "crypto";

export class CreateUserDto {
    @IsUUID()
    id: UUID;

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    passwordHash: string;

    @IsString()
    @IsUrl()
    imageUrl: string;
}