import { ConflictException, Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from '@prisma/client';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}
  async signup(authCredentials: AuthCredentialsDto): Promise<void> {
    //Verifier si email n est pas deja utiliser
    const user = await this.userService.findByEmail(authCredentials.email);

    if (user) {
      throw new ConflictException('Emeil alrady in use');
    }

    this.userService.create(authCredentials);
  }

  async signin(user: User, response: Response) {
    const payload = {
      userId: user.id,
    };
    const expires = new Date();
    expires.setSeconds(expires.getSeconds() + 3600);

    const token = this.jwtService.sign(payload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });

    return token;
  }
}
