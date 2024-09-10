import { Injectable } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './interfaces/token-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async login(user: UserDocument, response: Response) {
    //Create token payload
    const tokenPayload: TokenPayload = {
      userId: user._id.toHexString(),
    };

    //set exp date for token
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    // Generate token
    const token = this.jwtService.sign(tokenPayload);

    console.log('token', token);
    console.log('expires', expires);
    //Set token to cookie
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }
}
