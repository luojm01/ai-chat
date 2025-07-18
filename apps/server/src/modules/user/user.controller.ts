import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/common/auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('detail')
  @UseGuards(new JwtAuthGuard())
  getUser(@Req() req) {
    // 这里可以返回用户信息
    return req.user;
  }
}
