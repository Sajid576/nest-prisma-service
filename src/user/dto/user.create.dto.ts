import { IsString, IsMongoId, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'user name' })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'email' })
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'password' })
  password?: string;
}
