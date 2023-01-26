import {
  IsArray,
  IsBoolean,
  IsString,
  IsDate,
  IsMongoId,
  IsNumber,
  IsOptional,
  // ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProductSearchDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  fromDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  toDate?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  key?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @ApiProperty({ description: 'Category ID' })
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  @ApiProperty({ description: 'Page number. Starts from 0' })
  page?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Transform(({ value }) => Number(value))
  limit?: number;
}
