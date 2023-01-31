import {
  IsString,
  IsDate,
  IsMongoId,
  IsOptional,
  ValidateNested,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @IsString()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @ApiProperty({ description: 'password' })
  password: string;
}
