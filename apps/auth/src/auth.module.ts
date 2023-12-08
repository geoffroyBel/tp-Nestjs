import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guards';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProductModule } from './product/product.module';
import { ReservationsModule } from './reservations/reservations.module';

@Module({
  imports: [
    UsersModule,
    ProductModule,
    ReservationsModule,
    // PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'blabla',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
