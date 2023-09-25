// jwt-validation.middleware.ts
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config'; // Import ConfigService

// Extend the Request interface to declare the user property
declare global {
    namespace Express {
        interface Request {
            user: any; // Adjust the type as needed for your user data
        }
    }
}

@Injectable()
export class JwtValidationMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Token is missing');
    }

    try {
      const jwtSecret = this.configService.get<string>('JWT_SECRET');
      const decoded = this.jwtService.verify(token, { secret: jwtSecret });

      // Check if the token has expired
      const currentTimestamp = Date.now() / 1000; // Convert to seconds
      if (decoded.exp && decoded.exp < currentTimestamp) {
        throw new UnauthorizedException('Token has expired');
      }

      req.user = {
        id: decoded.id,
        name: decoded.name,
        email: decoded.email,
      };
      next();
    } catch (error) {
      if (error instanceof UnauthorizedException && error.message === 'Token has expired') {
        throw new UnauthorizedException('Token has expired');
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
