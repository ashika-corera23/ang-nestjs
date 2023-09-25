import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentSchema } from 'src/entity/student.schema';
import { Student } from './interface/student.interface';
import { StudentDTO } from './dto/student.dto';
import { promises } from 'dns';
@Injectable()
export class StudentService {

    constructor(@InjectModel('Student') private studentModel: Model<Student>){}

    // getStudent():string {

    //     return'this call from student service';
    // }

    async getAllStudent(): Promise<Student[]> {
     return await this.studentModel.find().exec();
    }

    async getOneStudent(id:string): Promise<Student> {
    return await this.studentModel.findById(id).exec();
    }

    async updateOneStudent(id:string,data: StudentDTO): Promise<Student> {
    return await this.studentModel.findOneAndUpdate({_id:id}, data,{new:true}).exec();
    } 

    async deleteOneStudent(id:string): Promise<Student> {
        return await this.studentModel.findOneAndDelete({_id:id}).exec();
        } 
    

    async createStudent(data: StudentDTO): Promise<Student> { 
        const student =new this.studentModel(data);
        return await student.save();
    }
    // async updateAllStudents(updateData: StudentDTO): Promise<void> {
    //     // Implement your bulk update logic here using Mongoose.
    //     // For example, to update all records, you can use the updateMany method:
    //     await this.studentModel.updateMany({}, updateData).exec();
    //   }
      

}
