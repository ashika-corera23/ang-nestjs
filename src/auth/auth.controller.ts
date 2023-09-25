import { Controller,Post ,Body,Get, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { singUpDto } from './dto/signup.dto';
import { ConfigModule } from '@nestjs/config';
import { loginDto } from './dto/login.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}


    @Post('/signup')
    signUp(@Body() singUpDto:singUpDto): Promise<{ token :string}>{

        return this.authService.SignUp(singUpDto);
    }


    @Get('/login')
    login(@Body() loginDto:loginDto): Promise<{ token :string}>{

        return this.authService.login(loginDto);
    }

    @Post('/login')
    async loginuser(@Body() loginDto:loginDto, @Res() response: Response): Promise<Response>{
        let token  = await this.authService.login(loginDto)
        return response.status(200).json(token);
    }

}