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

export class ProductCreateDto {
  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Category Id' })
  categoryId?: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'Name' })
  name?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Quantity' })
  quantity?: number;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ description: 'Price' })
  price?: number;

  @IsArray()
  @IsOptional()
  @ApiProperty({ description: 'Tags' })
  tags?: string[];
}
