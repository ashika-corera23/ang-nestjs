import { Document } from "mongoose";

export interface Student extends Document{
readonly name: String;
readonly age:number;
readonly city:String;

}