import {
  IsBoolean,
  IsString,
  IsNumber,
  IsMongoId,
  IsOptional,
  IsDate,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CategoryCreateDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name' })
  name?: string;
}
