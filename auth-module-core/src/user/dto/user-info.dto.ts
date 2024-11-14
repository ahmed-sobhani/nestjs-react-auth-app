import { Expose } from 'class-transformer';
import { ApiResponseProperty } from '@nestjs/swagger';

@Expose()
export class UserInfoDTO {
  @Expose()
  @ApiResponseProperty()
  email: string;

  @Expose()
  @ApiResponseProperty()
  fullName: string;

  @Expose()
  @ApiResponseProperty()
  _id: string;
}
