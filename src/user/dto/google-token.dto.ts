import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export default class GoogleTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'google token' })
  token: string;
}
