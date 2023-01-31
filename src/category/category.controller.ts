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

import { CategoryCreateDto, CategorySearchDto, CategoryUpdateDto } from './dto';
import { RolesGuard } from '../common/roles/roles.guard';
import { AuthGuard } from '../common/authentication/auth.guard';
import { Roles } from '../common/roles/roles.decorator';
import { Role } from '../common/roles/role.enum';
import { ResponseError, ResponseSuccess } from 'src/common/dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('api/v1/categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Create category' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and created category result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in creating category',
  })
  @ApiBearerAuth('Authorization')
  @Post('/')
  @Roles(Role.Admin)
  async create(@Body() payload: CategoryCreateDto) {
    const result = await this.categoryService.create(payload);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get category by query' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found category result[Array]',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding category',
  })
  @Get('/')
  async find(@Query() query: CategorySearchDto) {
    const result = await this.categoryService.find(query);
    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  @ApiOperation({ summary: 'Get one category by id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and found one category result by id',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in founding category by id',
  })
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    const result = await this.categoryService.findById(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update category given id' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and updated result',
  })
  @ApiResponse({
    status: 403,
    description:
      'Forbidden. Return error code and description in updating category by id',
  })
  @ApiBearerAuth('Authorization')
  @Patch('/:id')
  @Roles(Role.Admin)
  async update(@Param('id') id: string, @Body() payload: CategoryUpdateDto) {
    const result = await this.categoryService.update(id, payload);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }

  // @UseGuards(AuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete category given id' })
  @ApiResponse({ status: 200, description: 'Return success code' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code' })
  @ApiBearerAuth('Authorization')
  @Delete('/:id')
  @Roles(Role.Admin)
  async remove(@Param('id') id: string) {
    const result = await this.categoryService.remove(id);

    if (!result.success) {
      return new ResponseError(result.data, 'Fail').getResponse();
    }
    return new ResponseSuccess(result.data, 'Success').getResponse();
  }
}
