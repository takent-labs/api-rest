import { GetObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from '@nestjs/common';
import { GeneratePutUrlDto } from "./dto/generate-put-url.dto.js";

@Injectable()
export class R2Service {
    private readonly s3Client: S3Client;

    constructor() {
        const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;

        if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
            throw new Error('Faltan las variables de entorno de Cloudflare R2');
        }

        this.s3Client = new S3Client({
            region: 'auto',
            endpoint: R2_ENDPOINT,
            credentials: {
                accessKeyId: R2_ACCESS_KEY_ID,
                secretAccessKey: R2_SECRET_ACCESS_KEY,
            },
        });
    }

    async generateGetUrl(fileName: string): Promise<string> {
        const command = new GetObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: fileName,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    }

    async generatePutUrl(dto: GeneratePutUrlDto): Promise<string> {
        const command = new PutObjectCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: dto.fileName,
            ContentType: dto.contentType,
        });

        return await getSignedUrl(this.s3Client, command, { expiresIn: 300 });
    }
}