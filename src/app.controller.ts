import {
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
  // @UseGuards(JwtGuard)
  // @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const src =
      process.env.NODE_ENV === 'dev'
        ? 'http://localhost:3173/static/' + file.filename
        : 'https://design.zju.edu.cn/gylab-api/' + file.path;

    return src;
  }
}
