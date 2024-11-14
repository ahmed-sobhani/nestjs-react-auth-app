import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Expose()
export class ResponseDTO<T> {
  @Expose()
  @ApiResponseProperty()
  message: string;

  @Expose()
  @ApiResponseProperty()
  success: boolean;

  @Expose()
  @ApiResponseProperty()
  data: T | any;
}
