import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { plainToInstance } from 'class-transformer';
import { errorHandler, successHandler } from 'src/shared/helper/handlers';
import { UserInfoDTO } from './dto';
import { JWTAuthGuard } from 'src/auth/guards/jwt.auth.guard';

@UseGuards(JWTAuthGuard)
@ApiBearerAuth('JWT-Token')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'User profile',
  })
  async getProfile(@Req() req: any) {
    try {
      const result = await this.userService.findById(req?.user?.id);
      const response = plainToInstance(UserInfoDTO, result, {
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
      });
      return successHandler(response, 'User profile fetched successfully');
    } catch (error) {
      return errorHandler(error);
    }
  }
}
