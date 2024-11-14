import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseDTO } from '../dto';

export const successHandler = (
  data?: any,
  message?: string,
): ResponseDTO<any> => {
  return {
    success: true,
    data: data,
    message,
  };
};

export const errorHandler = (e: Error | any) => {
  let errorMessage = e.message || 'Something went wrong';
  let errorStatus = e.status || HttpStatus.INTERNAL_SERVER_ERROR;

  throw new HttpException(
    {
      success: false,
      message: errorMessage,
    },
    errorStatus,
  );
};
