import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserInfoDTO } from 'src/user/dto';

@Expose()
export class AuthenticatedUserDTO {
  @Expose()
  @ApiResponseProperty()
  accessToken: string;

  @Expose()
  @ApiResponseProperty()
  refreshToken: string;

  @Expose()
  @ApiResponseProperty()
  user: UserInfoDTO;
}
