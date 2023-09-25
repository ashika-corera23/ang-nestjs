import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentModule } from './student/student.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import * as dotenv from 'dotenv'; // Import dotenv

@Module({
 
 
  imports: [ ConfigModule.forRoot({
    envFilePath: '.env',
    isGlobal: true,
  }),
    MongooseModule.forRoot('mongodb://0.0.0.0:27017/my-db'),StudentModule, AuthModule],
      controllers: [AppController],
      providers: [AppService],
      exports: [MongooseModule]
      
})
export class AppModule {}
