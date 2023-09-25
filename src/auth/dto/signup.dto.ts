import {IsEmail, IsNotEmpty, IsString, MinLength} from 'class-validator';

export class singUpDto
{
    @IsNotEmpty()
    @IsString()
    readonly name:string;

    @IsNotEmpty()
    @IsEmail({}, {message:'please enter  correct email'})
    readonly email:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(60)
    readonly password:string;

}