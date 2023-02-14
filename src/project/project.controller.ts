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
  ParseIntPipe,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard/jwt.guard';

@ApiTags('项目')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  create(@Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(createProjectDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  findAll() {
    return this.projectService.findAll();
  }

  @Get('all')
  getAll() {
    return this.projectService.getAll();
  }

  @Get('random')
  getRandom(@Query('count', ParseIntPipe) count: number) {
    return this.projectService.getRandom(count);
  }

  @Get('heroProjects')
  getHeroProjects() {
    return this.projectService.getHeroProjects();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectService.update(id, updateProjectDto);
  }

  @Patch('/updateViewCount/:id')
  updateViewCount(@Param('id') id: string) {
    return this.projectService.updateViewCount(id);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.projectService.remove(id);
  }
}
