import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { PaperService } from './paper.service';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';

@ApiTags('论文')
@Controller('paper')
export class PaperController {
  constructor(private readonly paperService: PaperService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() createPaperDto: CreatePaperDto) {
    return this.paperService.create(createPaperDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.paperService.findAll();
  }

  @Get('all')
  getAll(@Query('year') year?: number) {
    return this.paperService.getAll(year);
  }

  @Get('year-options')
  getYearOptions() {
    return this.paperService.getYearOptions();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paperService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updatePaperDto: UpdatePaperDto) {
    return this.paperService.update(id, updatePaperDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.paperService.remove(id);
  }
}
