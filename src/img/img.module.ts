import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './entities/img.entity';
import { MulterModule } from '@nestjs/platform-express';
import { gylabMulterOptions } from '../upload/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Img]),
    MulterModule.register(gylabMulterOptions),
  ],
  controllers: [ImgController],
  providers: [ImgService],
  exports: [ImgService],
})
export class ImgModule {}
