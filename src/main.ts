import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Расписание НКЭиВТ')
    .setDescription('Документация API')
    .setVersion('1.0.0')
    .addTag('infeibal')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
