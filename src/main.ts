import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: {
      origin:
        process.env.NODE_ENV === 'dev'
          ? ['http://localhost:31731', 'http://localhost:5173']
          : ['https://design.zju.edu.cn', 'https://guanyunlab.anco.fun'],
      credentials: true,
    },
  });
  app.use(compression());
  app.use(cookieParser());

  app.setGlobalPrefix('gylab-api');
  // 静态资源路径
  app.useStaticAssets(join(__dirname, '..', '~gylab-static'), {
    prefix: '/static/',
  });
  const config = new DocumentBuilder()
    .setTitle('GYLab Home Page Api')
    .setDescription('GYLab Home Page Api')
    .addBearerAuth()
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-doc', app, document, { useGlobalPrefix: true });
  await app.listen(process.env.NODE_ENV === 'dev' ? 3173 : 31730);
}
bootstrap();
