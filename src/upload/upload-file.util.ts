import { BadRequestException } from '@nestjs/common';
import { extname } from 'path';
import * as fs from 'fs';
import {
  UPLOAD_ALLOWED_EXTENSIONS,
  UPLOAD_BLOCKED_EXTENSIONS,
  UPLOAD_BLOCKED_MIME_EXACT,
  UPLOAD_BLOCKED_MIME_PREFIXES,
} from './upload.constants';

export function getUploadExtension(originalname: string): string {
  const ext = extname(originalname).toLowerCase().replace(/^\./, '');
  if (!ext) {
    return '';
  }
  const parts = originalname.toLowerCase().split('.');
  for (const part of parts) {
    if (UPLOAD_BLOCKED_EXTENSIONS.has(part)) {
      throw new BadRequestException('不允许上传该类型文件');
    }
  }
  return ext;
}

export function assertUploadMimeAllowed(mimetype: string): void {
  const mime = (mimetype || '').toLowerCase();
  if (!mime) {
    return;
  }
  if (UPLOAD_BLOCKED_MIME_EXACT.has(mime)) {
    throw new BadRequestException('不允许上传该类型文件');
  }
  for (const prefix of UPLOAD_BLOCKED_MIME_PREFIXES) {
    if (mime.startsWith(prefix)) {
      throw new BadRequestException('不允许上传该类型文件');
    }
  }
}

export function assertUploadExtensionAllowed(ext: string): void {
  if (!ext || UPLOAD_BLOCKED_EXTENSIONS.has(ext)) {
    throw new BadRequestException('不允许上传该类型文件');
  }
  if (!UPLOAD_ALLOWED_EXTENSIONS.has(ext)) {
    throw new BadRequestException('不允许上传该类型文件');
  }
}

export const multerUploadFileFilter = (
  _req: Express.Request,
  file: Express.Multer.File,
  cb: (error: Error | null, acceptFile: boolean) => void,
) => {
  try {
    const ext = getUploadExtension(file.originalname);
    assertUploadExtensionAllowed(ext);
    assertUploadMimeAllowed(file.mimetype);
    cb(null, true);
  } catch (err) {
    const message =
      err instanceof BadRequestException
        ? err.message
        : '不允许上传该类型文件';
  cb(new Error(message), false);
  }
};

type MagicCheck = (buf: Buffer) => boolean;

const isJpeg: MagicCheck = (b) =>
  b.length >= 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff;

const magicByExt: Record<string, MagicCheck> = {
  jpg: isJpeg,
  jpeg: isJpeg,
  png: (b) =>
    b.length >= 4 &&
    b[0] === 0x89 &&
    b[1] === 0x50 &&
    b[2] === 0x4e &&
    b[3] === 0x47,
  gif: (b) =>
    b.length >= 4 &&
    b[0] === 0x47 &&
    b[1] === 0x49 &&
    b[2] === 0x46 &&
    b[3] === 0x38,
  webp: (b) =>
    b.length >= 12 &&
    b.slice(0, 4).toString('ascii') === 'RIFF' &&
    b.slice(8, 12).toString('ascii') === 'WEBP',
  bmp: (b) => b.length >= 2 && b[0] === 0x42 && b[1] === 0x4d,
  pdf: (b) => b.length >= 4 && b.slice(0, 4).toString('ascii') === '%PDF',
  zip: (b) =>
    b.length >= 4 && b[0] === 0x50 && b[1] === 0x4b && (b[2] === 0x03 || b[2] === 0x05),
  rar: (b) =>
    b.length >= 7 &&
    b[0] === 0x52 &&
    b[1] === 0x61 &&
    b[2] === 0x72 &&
    b[3] === 0x21 &&
    b[4] === 0x1a &&
    b[5] === 0x07,
  '7z': (b) =>
    b.length >= 6 &&
    b[0] === 0x37 &&
    b[1] === 0x7a &&
    b[2] === 0xbc &&
    b[3] === 0xaf &&
    b[4] === 0x27 &&
    b[5] === 0x1c,
  mp4: (b) => b.length >= 12 && b.slice(4, 8).toString('ascii') === 'ftyp',
  mov: (b) => b.length >= 12 && b.slice(4, 8).toString('ascii') === 'ftyp',
  m4v: (b) => b.length >= 12 && b.slice(4, 8).toString('ascii') === 'ftyp',
  m4a: (b) => b.length >= 12 && b.slice(4, 8).toString('ascii') === 'ftyp',
  webm: (b) =>
    b.length >= 4 &&
    b[0] === 0x1a &&
    b[1] === 0x45 &&
    b[2] === 0xdf &&
    b[3] === 0xa3,
  mkv: (b) =>
    b.length >= 4 &&
    b[0] === 0x1a &&
    b[1] === 0x45 &&
    b[2] === 0xdf &&
    b[3] === 0xa3,
  mp3: (b) =>
    (b.length >= 3 && b[0] === 0x49 && b[1] === 0x44 && b[2] === 0x33) ||
    (b.length >= 2 && b[0] === 0xff && (b[1] & 0xe0) === 0xe0),
  wav: (b) =>
    b.length >= 12 &&
    b.slice(0, 4).toString('ascii') === 'RIFF' &&
    b.slice(8, 12).toString('ascii') === 'WAVE',
  ogg: (b) => b.length >= 4 && b.slice(0, 4).toString('ascii') === 'OggS',
  flac: (b) => b.length >= 4 && b.slice(0, 4).toString('ascii') === 'fLaC',
  avi: (b) =>
    b.length >= 12 &&
    b.slice(0, 4).toString('ascii') === 'RIFF' &&
    b.slice(8, 12).toString('ascii') === 'AVI ',
  aac: (b) =>
    b.length >= 2 &&
    ((b[0] === 0xff && (b[1] & 0xf6) === 0xf0) ||
      (b.length >= 12 && b.slice(4, 8).toString('ascii') === 'ftyp')),
};

/** 落盘后再读文件头，与扩展名不一致则删除并拒绝 */
export function validateUploadedFileOnDisk(
  file: Express.Multer.File,
): void {
  if (!file?.path) {
    throw new BadRequestException('未收到上传文件');
  }
  const ext = getUploadExtension(file.originalname);
  assertUploadExtensionAllowed(ext);

  const head = Buffer.alloc(16);
  const fd = fs.openSync(file.path, 'r');
  try {
    const read = fs.readSync(fd, head, 0, 16, 0);
    const buf = head.subarray(0, read);
    const checker = magicByExt[ext];
    if (checker && !checker(buf)) {
      throw new BadRequestException('文件内容与类型不符');
    }
  } finally {
    fs.closeSync(fd);
  }
}

export function removeUploadedFile(path: string): void {
  try {
    if (fs.existsSync(path)) {
      fs.unlinkSync(path);
    }
  } catch {
    /* ignore */
  }
}