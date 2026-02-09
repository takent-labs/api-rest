import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class UserPayloadDto {
   id: string;
   username: string;
   email: string;
}

export class AuthResponseDto {
   accessToken: string;
   user: UserPayloadDto;
}