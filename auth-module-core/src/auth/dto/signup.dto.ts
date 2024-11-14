import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDTO {
  @IsNotEmpty()
  @ApiProperty({ required: true })
  fullName: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ required: true })
  email: string;

  @IsNotEmpty()
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'password too weak, must contain at least 8 characters, 1 lowercase, 1 uppercase, 1 number, 1 symbol',
    },
  )
  @ApiProperty({ required: true })
  password: string;
}
