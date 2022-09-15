import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';
import { join } from 'path';

async function bootstrap() {
  let key: Buffer;
  let cert: Buffer;
  try {
    key = fs.readFileSync(join(process.cwd(), "./secrets/private-key.pem"));
    cert = fs.readFileSync(join(process.cwd(), "./secrets/public-certificate.pem"));
  } catch (error) {
    console.log(error);
  }
  const httpsOptions = {
    key: key,
    cert: cert,
  }

  const app = await NestFactory.create(AppModule
    , {
      httpsOptions,
    });
  
  const config = new DocumentBuilder()
    .setTitle('Dogs API')
    .setDescription('The dogs API description')
    .setVersion('1.0')
    .addTag('dogs')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(3000);
}
bootstrap();
