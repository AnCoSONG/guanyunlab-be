import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';

@ApiTags('元数据')
@Controller('metadata')
export class MetadataController {
  constructor(private readonly metadataService: MetadataService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() createMetadatumDto: CreateMetadatumDto) {
    return this.metadataService.create(createMetadatumDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.metadataService.findAll();
  }

  @Get('aboutImgs')
  getAboutImgs() {
    return this.metadataService.getAboutImgs();
  }

  @Get('contactHypertexts')
  getContactHypertexts() {
    return this.metadataService.getContactHypertexts();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metadataService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateMetadatumDto: UpdateMetadatumDto,
  ) {
    return this.metadataService.update(id, updateMetadatumDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.metadataService.remove(id);
  }
}
