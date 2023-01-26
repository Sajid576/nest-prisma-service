import {
  Controller,
  Get,
  Res,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../common/authentication/auth.guard';
import {
  ApiResponse,
  ApiOperation,
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

import { storage } from './file.config';

@ApiTags('File')
@Controller('api/v1/file')
export class FileController {
  @UseGuards(AuthGuard)
  @ApiOperation({
    summary: 'Upload file with form data with "file" field name.',
  })
  @ApiResponse({
    status: 200,
    description: 'Return success code and uploaded file',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden. Return error code and description',
  })
  @ApiBearerAuth('Authorization')
  @Post('/upload') // API path
  @UseInterceptors(
    FileInterceptor(
      'file', // name of the field being passed
      { storage },
    ),
  )
  async uploadFile(@UploadedFile() file: any) {
    return file;
  }

  @ApiOperation({ summary: 'Get file by fileId.' })
  @ApiResponse({
    status: 200,
    description: 'Return success code and uploaded file',
  })
  @Get('/:fileId')
  async getFile(
    @Param('fileId') fileId: string,
    @Res() res: any,
  ): Promise<any> {
    res.sendFile(fileId, { root: 'uploads' });
  }
}
