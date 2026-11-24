/** 业务允许的上传扩展名（小写，不含点）；不含 svg */
export const UPLOAD_ALLOWED_EXTENSIONS = new Set([
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'bmp',
  'mp4',
  'webm',
  'mov',
  'm4v',
  'avi',
  'mkv',
  'mp3',
  'wav',
  'ogg',
  'm4a',
  'aac',
  'flac',
  'pdf',
  'zip',
  'rar',
  '7z',
]);

/** 一律拒绝的可执行/脚本类后缀 */
export const UPLOAD_BLOCKED_EXTENSIONS = new Set([
  'html',
  'htm',
  'xhtml',
  'svg',
  'svgz',
  'js',
  'mjs',
  'jsx',
  'ts',
  'php',
  'phtml',
  'asp',
  'aspx',
  'jsp',
  'exe',
  'bat',
  'cmd',
  'sh',
  'ps1',
  'wasm',
  'cgi',
]);

export const UPLOAD_BLOCKED_MIME_PREFIXES = ['image/svg'] as const;

export const UPLOAD_BLOCKED_MIME_EXACT = new Set([
  'text/html',
  'application/xhtml+xml',
  'text/javascript',
  'application/javascript',
  'application/x-php',
  'application/php',
]);