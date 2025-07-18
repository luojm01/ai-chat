import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-github2';
import { AppService } from '../../app.service';
import { JwtService } from '@nestjs/jwt';
import { GithubProfile } from '../../types/github-profile.type';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
      scope: ['user:email'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: (error: any, user?: any) => void,
  ) {
    const user = await this.appService.validateGithubUser({
      ...profile,
      accessToken,
    });

    const jwtToken = this.jwtService.sign({
      userId: user.id,
      username: user.username,
      accessToken,
    });

    done(null, {
      ...user,
      jwtToken,
    });
  }
}
