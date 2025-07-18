import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('github')
  @UseGuards(AuthGuard('github'))
  githubAuth() {}

  @Get('github/callback')
  @UseGuards(AuthGuard('github'))
  // @Redirect('http://localhost:8888/login-success') // 前端登录成功页面
  githubAuthCallback(@Req() req: Request, @Res() res: Response) {
    // 获取用户信息和token
    const { user } = req as any;
    const jwtToken = user?.jwtToken;
    // 将token作为查询参数附加到重定向URL
    res.cookie('token', jwtToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.redirect(`http://localhost:8888/chat`);
  }

  @Get('logout')
  logout(@Req() req, @Res() res: Response) {
    req.logout(); // 调用 Passport 的 logout 方法，清除 session 和 user 信息
    // 清除token
    res.clearCookie('token');
    // 重定向到登录页面
    res.redirect('/');
  }
}
