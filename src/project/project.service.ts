import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectService {
  async getRandom(count: number) {
    const res = await this.getAll();
    if (count > res.length) {
      count = res.length;
    }
    const randomIndices = [];
    const randomProjects = [];
    while (randomIndices.length < count) {
      const randomIndex = Math.floor(Math.random() * res.length);
      if (!randomIndices.includes(randomIndex)) {
        randomIndices.push(randomIndex);
        randomProjects.push(res[randomIndex]);
      }
    }
    return randomProjects;
  }
  async getAll() {
    return await this.projectRepository.find({
      order: { create_date: 'DESC' },
      select: [
        'id',
        'hero_img',
        'en_name',
        'cn_name',
        'first_author',
        'view_count',
        'create_date',
        'short_abstract',
      ],
    });
  }
  async updateViewCount(id: string) {
    return await this.projectRepository.increment({ id }, 'view_count', 1);
  }
  private readonly logger = new Logger(ProjectService.name);
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto) {
    this.logger.log('create project');
    const newProject = this.projectRepository.create(createProjectDto);
    const createRes = await this.projectRepository.save(newProject);
    return createRes;
  }

  async findAll() {
    return await this.projectRepository.find({
      order: { create_date_real: 'DESC' },
    });
  }

  async findOne(id: string) {
    const item = await this.projectRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `Project with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.projectRepository.merge(
      itemToBeUpdate,
      updateProjectDto,
    );
    return await this.projectRepository.save(updated);
  }

  async remove(id: string) {
    return await this.projectRepository.delete(id);
  }
}
