import {
  BadRequestException,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth } from '@nestjs/swagger';
import { AppService } from './app.service';
import { JwtGuard } from './auth/guard/jwt.guard';
import {
  removeUploadedFile,
  validateUploadedFileOnDisk,
} from './upload/upload-file.util';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/testJwt')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  testJwt() {
    return 'pass';
  }

  @Post('upload')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('未收到上传文件');
    }
    try {
      validateUploadedFileOnDisk(file);
    } catch (err) {
      removeUploadedFile(file.path);
      throw err;
    }
    const src =
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3173/static/' + file.filename
        : 'https://design.zju.edu.cn/gylab-api/' + file.path;

    return { location: src };
  }
}
