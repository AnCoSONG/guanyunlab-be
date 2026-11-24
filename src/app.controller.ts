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
import * as os from 'os';

/** 写死探针 ID：外网 curl 若与此不一致，说明没打到本仓库最新部署 */
export const DEPLOYMENT_PROBE_ID = 'gylab-probe-7f3a9c2e-8b14-4d6a-9e31';

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

  /** 部署探针：用于确认外网流量是否打到当前机器与进程（验收后可删） */
  @Get('deployment-check')
  deploymentCheck() {
    return {
      deployId: DEPLOYMENT_PROBE_ID,
      host: os.hostname(),
      cwd: process.cwd(),
      pid: process.pid,
      nodeEnv: process.env.NODE_ENV ?? 'unknown',
      at: new Date().toISOString(),
    };
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
