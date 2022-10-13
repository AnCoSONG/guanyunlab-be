import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateImgDto } from './dto/create-img.dto';
import { UpdateImgDto } from './dto/update-img.dto';
import { Img } from './entities/img.entity';

@Injectable()
export class ImgService {
  async query(alt: string = '', page: number = 1, limit: number = 10) {
    if (page <= 0 || limit <= 0) { 
      throw new BadRequestException(
        `page: ${page} or limit: ${limit} is not valid`
      )
    }
    const [result, total] = await this.imgRepository.findAndCount({
      where: { alt: Like(`%${alt}%`) },
      order: { create_date: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    })
    return {
      result,
      total,
    }

  }
  constructor(@InjectRepository(Img) private imgRepository: Repository<Img>) {}
  async create(createImgDto: CreateImgDto) {
    const item = this.imgRepository.create(createImgDto);
    return await this.imgRepository.save(item);
  }

  async findAll() {
    return this.imgRepository.find({
      order: { create_date: 'desc' }
    })
  }

  async findOne(id: string) {
    const item = await this.imgRepository.findOneBy({ id })
    if (!item) {
      throw new NotFoundException(
        `Img id: ${id} is not valid`
      )
    }
    return item;
  }

  async findOneByAlt(alt: string) {
    const item = await this.imgRepository.findOneBy({ alt })
    if (!item) {
      throw new NotFoundException(
        `Img alt: ${alt} is not valid`
      )
    }
    return item;
  }

  async update(id: string, updateImgDto: UpdateImgDto) {
    const item = await this.findOne(id);
    const merged = await this.imgRepository.merge(item, updateImgDto)
    return await this.imgRepository.save(merged)
  }

  async remove(id: string) {
    return await this.imgRepository.delete(id)
  }
}
