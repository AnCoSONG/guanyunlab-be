import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePaperDto } from './dto/create-paper.dto';
import { UpdatePaperDto } from './dto/update-paper.dto';
import { Paper } from './entities/paper.entity';

@Injectable()
export class PaperService {
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
