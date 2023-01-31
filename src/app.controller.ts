import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Test API' })
  @ApiResponse({ status: 200, description: 'Return <Hello World!> text.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiBearerAuth('Authorization')
  @Get()
  root(): string {
    return this.appService.root();
  }
}
