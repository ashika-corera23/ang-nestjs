import { Body, Controller, Get,Put,Post} from '@nestjs/common';
import { AppService } from './app.service';
import { create } from 'domain';

//http://localhost:3000/  => @Controller()

//http://localhost:3000/student
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

 @Post()
    create(@Body('name') name: string, @Body('age') age: number ):string{
      return 'hii ' +name + ' myage '+age;
    }   
  
  @Put()
  putHello(): string {
    return 'hiiii its put method in nest js';
  }
}
