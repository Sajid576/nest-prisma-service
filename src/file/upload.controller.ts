import {
  Controller,
  Get,
  Res,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from "@nestjs/platform-express";

import { storage } from "./storage.config"

@Controller('file')
export class UploadController {
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Upload file with form data with "file" field name.' })
  @ApiResponse({ status: 200, description: 'Return success code and uploaded file' })
  @ApiResponse({ status: 403, description: 'Forbidden. Return error code and description' })
  @ApiBearerAuth('Authorization')
  @Post("upload") // API path
  @UseInterceptors(
    FileInterceptor(
      "file", // name of the field being passed
      { storage }
    )
  )
  async upload(@UploadedFile() file) {
    return file;
  }

  @ApiOperation({ summary: 'Get file by fileId.' })
  @ApiResponse({ status: 200, description: 'Return success code and uploaded file' })
  @Get('/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }
}