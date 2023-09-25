import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as dotenv from 'dotenv';
import{cors} from 'cors';

 // Load environment variables from .env file




async function bootstrap() {


  dotenv.config();
  const logger = new Logger('Main');

  process.on('unhandledRejection', (reason, promise) => {
    logger.error(`Unhandled Promise Rejection: ${reason}`);
  });
  

  const app = await NestFactory.create(AppModule,{cors:true});
  await app.listen(8001);
}
bootstrap();
