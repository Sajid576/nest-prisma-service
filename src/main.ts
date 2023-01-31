import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
import { AllExceptionsFilter } from './common/filters/all-exception.filter';
import helmet from 'helmet';
import { env } from 'src/utils/env';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    bufferLogs: true,
    logger: ['error', 'log', 'debug'],
  });

  app.useLogger(app.get(Logger));
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  const options = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS',
    preflightContinue: false,
    optionsSuccessStatus: 200,
    credentials: true,
  };
  app.enableCors(options);

  const config = new DocumentBuilder()
    .setTitle('INFANITY')
    .setDescription('INFANITY api')
    .setVersion('1.0')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'Authorization',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  app.use('/public', express.static(join(__dirname, '../../public')));
  app.useGlobalFilters(new AllExceptionsFilter());
  /* SECURITY */
  app.enable('trust proxy');
  app.use(helmet());
  try {
    // await connectMoralis();

    await app.listen(env.PORT);
    console.log('Server started on port ', env.PORT);
  } catch (e) {
    console.log('ERROR', e.message);
  }
}
bootstrap();
