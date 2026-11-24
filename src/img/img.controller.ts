import {
  BadRequestException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ImgService } from './img.service';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from '../auth/guard/jwt.guard';
import {
  removeUploadedFile,
  validateUploadedFileOnDisk,
} from '../upload/upload-file.util';

@ApiTags('图像')
@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createImgDto: Omit<CreateImgDto, 'url'>,
  ) {
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
    return this.imgService.create({ ...createImgDto, url: src });
  }

  @Get()
  findAll() {
    return this.imgService.findAll();
  }

  @Get('query')
  @ApiQuery({ name: 'alt', required: false })
  @ApiQuery({ name: 'page', required: false })
  @ApiQuery({ name: 'limit', required: false })
  query(
    @Query('alt') alt: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.imgService.query(alt, page, limit);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imgService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateImgDto: UpdateImgDto) {
    return this.imgService.update(id, updateImgDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.imgService.remove(id);
  }
}
