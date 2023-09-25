import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';

import { StudentService } from './student.service';
import { StudentDTO } from './dto/student.dto';
import { Student } from './interface/student.interface';
import { promises } from 'dns';

@Controller('student')
export class StudentController {

    constructor(private readonly studentService: StudentService) { }
    @Get()
    //  getStudent(): string {

    //     return this.studentService.getStudent();

    async getAllStudent(): Promise<Student[]> {

        return this.studentService.getAllStudent();

    }

    @Get(':id')
    async getOneStudent(@Param('id') id: string): Promise<Student> {

        return this.studentService.getOneStudent(id);

    }
    @Put(':id')
    async updateOneStudent(@Param('id') id: string, @Body() data: StudentDTO): Promise<Student> {
        return this.studentService.updateOneStudent(id, data);

    }
    //  @Put()
    //  async updateAllStudents(@Body() updateData: StudentDTO): Promise<void> {
    //    await this.studentService.updateAllStudents(updateData);
    //    console.log(updateData);
    //  }


    @Delete(':id')
    async deleteOneStudent(@Param('id') id: string): Promise<Student> {

        return this.studentService.deleteOneStudent(id);

    }

    //@Body('name') name: string
    @Post()
    async createStudent(@Body() data: StudentDTO): Promise<Student> {
        // return  this.studentService.getStudent();
        return await this.studentService.createStudent(data);
    }

}

