// protected.controller.ts
import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('protected')
export class ProtectedController {
    @Get('profile')
    //  @UseGuards(JwtAuthGuard)
    getProfile(@Request() req) {
        console.log('hiiiii');
        console.log(req.user);
        const user = req.user;
        return user;
    }
}