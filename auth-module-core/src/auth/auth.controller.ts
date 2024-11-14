import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Throttle } from '@nestjs/throttler';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { errorHandler, successHandler } from 'src/shared/helper/handlers';
import { AuthenticatedUserDTO, SignUpDTO, UserSignInDTO } from './dto';
import { ResponseDTO } from 'src/shared/dto';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Throttle({
    default: { limit: 4, ttl: 60000 },
  })
  @ApiResponse({
    description: 'User signed in successfully',
    type: ResponseDTO<UserSignInDTO>,
  })
  @ApiBody({ type: UserSignInDTO })
  @ApiOperation({ summary: 'Sign in a user' })
  async signIn(@Body() body: UserSignInDTO) {
    try {
      const data = await this.authService.signIn(body);
      const response = plainToInstance(AuthenticatedUserDTO, data, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
      return successHandler(response, 'User signed in successfully');
    } catch (error) {
      return errorHandler(error);
    }
  }

  @Post('sign-up')
  @Throttle({
    default: { limit: 3, ttl: 60000 },
  })
  @ApiResponse({
    description: 'SignUp was successfully',
    type: ResponseDTO<SignUpDTO>,
  })
  @ApiBody({ type: SignUpDTO })
  @ApiOperation({ summary: 'Sign up a user' })
  async signUp(@Body() body: SignUpDTO) {
    try {
      const result = await this.authService.signUp(body);
      const response = plainToInstance(AuthenticatedUserDTO, result, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
      return successHandler(response, 'User signed up successfully');
    } catch (error) {
      return errorHandler(error);
    }
  }
}
