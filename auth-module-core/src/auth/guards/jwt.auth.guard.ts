import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { configService } from 'src/config/config.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JWTAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractToken(request);
    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: configService.getJWTSecret(),
      });

      const user = await this.userService.findById(payload.sub);
      if (!user) throw new UnauthorizedException();

      request['user'] = user;
    } catch (error) {
      throw new UnauthorizedException();
    }
    return true;
  }

  extractToken(request: Request) {
    return (
      request?.cookies?.['access_token'] ||
      request?.headers['authorization']?.split(' ')[1]
    );
  }
}
