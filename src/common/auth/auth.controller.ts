import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Controller, Post, UseGuards, Request, Get } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private service: AuthService) {}

  @Post('sign-in')
  @UseGuards(AuthGuard('local'))
  signIn(@Request() request: { user }): Promise<any> {
    return this.service.signIn(request.user);
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Request() request: { user }): Promise<any> {
    return this.service.profile(request.user);
  }

  @Post('sign-out')
  @UseGuards(AuthGuard('local'))
  signOut(@Request() request: { logout }): Promise<any> {
    return request.logout();
  }
}
