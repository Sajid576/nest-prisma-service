import {
  Body,
  Controller,
  Param,
  Post,
  Put,
  Get,
  Req,
  Header,
  Headers,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateUserDto, LoginUserDto } from './dto';
import { UserService } from './user.service';
import { ResponseError, ResponseSuccess } from 'src/common/dto';
import { Role } from 'src/common/roles';
import { Roles } from '../common/roles/roles.decorator';

@ApiTags('User')
@Controller('api/v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // REGISTER ADMIN
  @ApiOperation({ summary: 'Register a new admin' })
  @ApiResponse({
    status: 200,
    description: 'User successfully created. Return created user',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Return error code and description',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request. Return error code and description',
  })
  @Post('/admin/register')
  async createAdmin(@Body() payload: CreateUserDto) {
    const result = await this.userService.registerAdmin(payload);
    if (!result.success) {
      return new ResponseError(
        result.data,
        'ADMIN_REGISTRATION.FAILED',
      ).getResponse();
    }
    return new ResponseSuccess(
      result.data,
      'ADMIN_REGISTRATION.SUCCESS',
    ).getResponse();
  }

  // ADMIN LOGIN
  @ApiOperation({ summary: 'Admin login using email' })
  @ApiResponse({
    status: 200,
    description: 'Return success code for email login',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Return error code for email login',
  })
  @Post('/admin/login')
  async adminLogin(@Body() payload: LoginUserDto) {
    const result = await this.userService.login(payload, Role.Admin);
    if (!result.success) {
      return new ResponseError(result.data, 'ADMIN_LOGIN.FAILED').getResponse();
    }
    return new ResponseSuccess(
      result.data,
      'ADMIN_LOGIN.SUCCESS',
    ).getResponse();
  }
}
