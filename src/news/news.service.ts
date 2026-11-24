import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { News } from './entities/news.entity';

@Injectable()
export class NewsService {
  async getAll(count: number) {
    return await this.newsRepository.find({
      order: { last_date: 'DESC' },
      take: count,
    });
  }
  constructor(
    @InjectRepository(News) private newsRepository: Repository<News>,
  ) {}
  async create(createNewsDto: CreateNewsDto) {
    const item = this.newsRepository.create(createNewsDto);
    return await this.newsRepository.save(item);
  }

  async findAll() {
    return await this.newsRepository.find({
      order: { update_date: 'DESC', last_date: 'DESC' },
    });
  }

  async findOne(id: string) {
    const item = await this.newsRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `News with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.newsRepository.merge(itemToBeUpdate, updateNewsDto);
    return await this.newsRepository.save(updated);
  }

  async remove(id: string) {
    return await this.newsRepository.delete(id);
  }
}
