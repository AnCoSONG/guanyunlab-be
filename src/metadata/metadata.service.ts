import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { Metadatum } from './entities/metadatum.entity';

@Injectable()
export class MetadataService {
  async getContactHypertexts() {
    const res = await this.metadatumRepository.find({
      select: ['contact_hypertext'],
    });
    if (res.length === 0) {
      throw new NotFoundException(
        `Contact hypertext does not exist in the database`,
      );
    }
    return res[0];
  }
  async getAboutImgs() {
    const res = await this.metadatumRepository.find({
      select: ['about_heros'],
    });
    if (res.length === 0) {
      throw new NotFoundException(`About img does not exist in the database`);
    } else {
      return res[0].about_heros;
    }
  }
  constructor(
    @InjectRepository(Metadatum)
    private metadatumRepository: Repository<Metadatum>,
  ) {}
  async create(createMetadatumDto: CreateMetadatumDto) {
    const item = this.metadatumRepository.create(createMetadatumDto);
    return await this.metadatumRepository.save(item);
  }

  async findAll() {
    return await this.metadatumRepository.find();
  }

  async findOne(id: string) {
    const item = await this.metadatumRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `Metadatum with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updateMetadatumDto: UpdateMetadatumDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.metadatumRepository.merge(
      itemToBeUpdate,
      updateMetadatumDto,
    );
    return await this.metadatumRepository.save(updated);
  }

  async remove(id: string) {
    return await this.metadatumRepository.delete(id);
  }
}
