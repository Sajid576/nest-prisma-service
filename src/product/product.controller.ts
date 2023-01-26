import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { ProductService } from './ProductService';
import { ProductCreateDto, ProductSearchDto, ProductUpdateDto } from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';

@ApiTags('Product')
@Controller('api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create product' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created product result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating product',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() payload: ProductCreateDto) {
    const result = await this.productService.create(payload);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get product by query' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found meals result[Array]',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding meals',
  })
  @Get('/')
  async find(@Query() query: ProductSearchDto) {
    const result = await this.productService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get one product by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one product result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding product by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.productService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update product given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating product by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() payload: ProductUpdateDto) {
    const result = await this.productService.update(id, payload);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete product given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.productService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
