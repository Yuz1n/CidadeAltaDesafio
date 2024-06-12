import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'newuser' })
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'password123' })
  password: string;
}
