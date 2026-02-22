import { IsIn, IsString } from "class-validator";

export class GeneratePutUrlDto {
    @IsString()
    fileName: string;

    @IsIn(['image/jpeg', 'image/png'], {
        message: 'Solo se permiten imágenes JPG o PNG'
    })
    contentType: string;
}