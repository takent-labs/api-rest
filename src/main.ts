import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  })

  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }
  ));

  const config = new DocumentBuilder()
    .setTitle('Takent')
    .setDescription('Takent API-REST')
    .setVersion('1.0')
    .addTag('Takent')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory);

  // const allowedOrigins = [
  //   'http://localhost:3000',
  //   'https://takent.app',
  // ];

  // app.enableCors({
  //   origin: (origin, callback) => {
  //     if (!origin || allowedOrigins.includes(origin)) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('No permitido por CORS'));
  //     }
  //   },
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  //   allowedHeaders: 'Content-Type, Accept, Authorization',
  // });

  // Solo para desarrollo
  app.enableCors();

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
