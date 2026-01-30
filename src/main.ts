import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('WanderSync API')
    .setDescription('API de gestão de viagens')
    .setVersion('1.0')
    .addBearerAuth() //  cadeado para testar token
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acessar em /api
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,

  }));
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3001);

}

bootstrap();
