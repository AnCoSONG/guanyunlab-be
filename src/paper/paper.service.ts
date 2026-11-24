import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { Paper } from './entities/paper.entity';

@Injectable()
export class PaperService {
  async getAll(year?: number) {
    const queryCondition = {
      order: { published_at: 'DESC' as const },
    };
    if (year) {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59);
      queryCondition['where'] = {
        ...queryCondition['where'],
        published_at: Between(startDate, endDate),
      };
    }
    return await this.paperRepository.find(queryCondition);
  }

  async getYearOptions() {
    const papers = await this.paperRepository
      .createQueryBuilder('paper')
      .select('DISTINCT YEAR(paper.published_at)', 'year')
      .orderBy('year', 'DESC')
      .getRawMany();
    return papers.map((p) => p.year);
  }
  constructor(
    @InjectRepository(Paper) private paperRepository: Repository<Paper>,
  ) {}
  async create(createPaperDto: CreatePaperDto) {
    const item = this.paperRepository.create(createPaperDto);
    return await this.paperRepository.save(item);
  }

  async findAll() {
    return await this.paperRepository.find({
      order: { create_date: 'DESC' },
    });
  }

  async findOne(id: string) {
    const item = await this.paperRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `Paper with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updatePaperDto: UpdatePaperDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.paperRepository.merge(itemToBeUpdate, updatePaperDto);
    return await this.paperRepository.save(updated);
  }

  async remove(id: string) {
    return await this.paperRepository.delete(id);
  }
}
