import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  await app.listen(3000);
}
bootstrap();
