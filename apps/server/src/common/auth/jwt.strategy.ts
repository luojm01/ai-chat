import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      // 从请求头中提取token
      // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // 从cookie中提取token
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = request?.headers?.cookie || '';
          const cookieArray = cookies.split(';').map(cookie => cookie.trim());
          
          for (const cookie of cookieArray) {
            const [name, value] = cookie.split('=');
            if (name === 'token') {
              // console.log('token:', value);
              return value;
            }
          }
          
          console.log('No valid token found in cookies');
          return null;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || '',
    });
  }

  validate(payload: any) {
    console.log('payload:', payload);
    return { userId: payload.userId, username: payload.username };
  }
}
