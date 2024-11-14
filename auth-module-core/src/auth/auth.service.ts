import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { UserDocument } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { configService } from 'src/config/config.service';
import { bcryptComparePassword } from 'src/shared/helper/hashing.helper.service';
import { SignUpDTO, UserSignInDTO } from './dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Return user auth data
   * @param user user document
   * @returns access token, refresh token and user
   */
  async getUserAuthData(user: UserDocument) {
    const payload = {
      email: user.email,
      fullName: user.fullName,
      sub: user.id,
    };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: configService.getJWTRefreshSecret(),
      expiresIn: configService.getRefreshTokenExpireIn(),
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }

  /**
   * Login User by email & password
   * @param userData user email and password
   * @returns access token, refresh token and user
   */
  async signIn(userData: UserSignInDTO) {
    const user: UserDocument = await this.userService.findByEmail(
      userData.email,
    );

    if (
      !user ||
      !(await bcryptComparePassword(userData.password, user?.hashedPassword))
    ) {
      // Note:
      // For more security, we can save failed login attempts and block the user after a certain number of attempts
      throw new UnauthorizedException();
    }

    return await this.getUserAuthData(user);
  }

  /**
   * Create a new user
   * @param userData User data
   * @returns access token, refresh token and user
   */
  async signUp(userData: SignUpDTO) {
    const user = await this.userService.create(userData);

    return await this.getUserAuthData(user);
  }
}
