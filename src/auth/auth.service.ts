import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { Hash } from 'crypto';
import { JwtService } from '@nestjs/jwt/dist';
import { singUpDto } from './dto/signup.dto';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { EmailService } from './email.service';
import { loginDto } from './dto/login.dto';
import { promises } from 'dns';


//auth.service.ts

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModule: Model<User>,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) { }



  async SignUp(singUpDto: singUpDto): Promise<{ token: string }> {
    const { name, email, password } = singUpDto

    const hassedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModule.create({

      name,
      email,
      password: hassedPassword
    })

    // const token = this.jwtService.sign({id:user._id});
    const token = this.jwtService.sign({
      id: user._id,
      name: user.name, // Include name property
      email: user.email, // Include email property
    });

    // Send a welcome email
    const welcomeSubject = 'Welcome to My App';
    const welcomeText = 'Thank you for signing up!';

    try {
      // Email sending code here

      this.emailService.sendEmail(email, welcomeSubject, welcomeText);
    } catch (error) {
      console.error('Error sending email:', error);
    }
    return { token }
  }

  async login(loginDto: loginDto): Promise<{ token: string, status: string }> {
    const { email, password } = loginDto;

    const user = await this.userModule.findOne({ email })

    if (!user) {

      throw new UnauthorizedException('Invalid email or password')

    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {

      throw new UnauthorizedException('Invalid email or password')

    }
    // const token = this.jwtService.sign({id:user._id});

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name, // Include name property
      email: user.email, // Include email property
    });

    console.log('hi');
    return { token, status: "success" }
  }


  async loginuser(loginDto: loginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModule.findOne({ email })

    if (!user) {

      throw new UnauthorizedException('Invalid email or password')

    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if (!isPasswordMatch) {

      throw new UnauthorizedException('Invalid email or password')

    }
    // const token = this.jwtService.sign({id:user._id});

    const token = this.jwtService.sign({
      id: user._id,
      name: user.name, // Include name property
      email: user.email, // Include email property
    });

    console.log('hi');
    return { token }
  }









}
