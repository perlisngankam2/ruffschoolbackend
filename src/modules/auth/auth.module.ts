/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './local.strategie';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserModule } from '../user/user.module';


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: 'hide-me',
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, AuthResolver,LocalStrategy,JwtStrategy,JwtAuthGuard],
})
export class AuthModule {}
