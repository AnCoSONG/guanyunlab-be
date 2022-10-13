import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Img } from './entities/img.entity';
import { MulterModule } from '@nestjs/platform-express';
import * as multer from 'multer';
import * as fs from 'fs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Img]),
    MulterModule.register({
      // dest: './datasets',
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync('./~gylab-static')) {
            fs.mkdirSync('./~gylab-static');
          }
          cb(null, './~gylab-static');
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
  ],
  controllers: [ImgController],
  providers: [ImgService],
  exports: [ImgService],
})
export class ImgModule {}
