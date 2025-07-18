import { Injectable } from '@nestjs/common';
import { GithubProfile } from './types/github-profile.type';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async validateGithubUser(profile: GithubProfile & { accessToken?: string }) {
    // 这里可以添加用户验证和数据库存储逻辑
    const result = {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
      photos: profile.photos,
      accessToken: profile.accessToken,
    };

    // 假设用户验证通过，返回用户信息
    console.log('User validated:', result);
    return Promise.resolve(result);
  }
}
