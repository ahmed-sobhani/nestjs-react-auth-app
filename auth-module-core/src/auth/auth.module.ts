import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      secret: configService.getJWTSecret(),
      global: true,
      signOptions: { expiresIn: configService.getTokenExpireIn() },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
