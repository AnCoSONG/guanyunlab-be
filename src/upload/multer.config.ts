import * as multer from 'multer';
import * as fs from 'fs';
import { basename } from 'path';
import { randomBytes } from 'crypto';
import { multerUploadFileFilter } from './upload-file.util';

export const gylabMulterOptions: multer.Options = {
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: multerUploadFileFilter,
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      if (!fs.existsSync('./~gylab-static')) {
        fs.mkdirSync('./~gylab-static');
      }
      cb(null, './~gylab-static');
    },
    filename: (_req, file, cb) => {
      const safeName = basename(file.originalname).replace(
        /[^\w.\-()\u4e00-\u9fff]+/g,
        '_',
      );
      const uniqueName = `${Date.now()}-${randomBytes(4).toString('hex')}-${safeName}`;
      cb(null, uniqueName);
    },
  }),
};