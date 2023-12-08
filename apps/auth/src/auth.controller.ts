import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guards';
import { currentUser } from './decorators/current-user.decorator';
import { User } from '@prisma/client';
import { Response } from 'express';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/signin')
  async signin(
    @currentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.signin(user, response);
    response.send(user);
  }

  // @Post('/signup')
  // signup(@Body() autCredential: AuthCredentialsDto) {
  //   this.authService.signup(autCredential)
  // }
}
