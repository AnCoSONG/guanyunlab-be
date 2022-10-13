import { PartialType } from '@nestjs/swagger';
import { CreateImgDto } from './create-img.dto';

export class UpdateImgDto extends PartialType(CreateImgDto) {}
