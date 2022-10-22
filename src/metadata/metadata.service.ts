import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMetadatumDto } from './dto/create-metadatum.dto';
import { UpdateMetadatumDto } from './dto/update-metadatum.dto';
import { Metadatum } from './entities/metadatum.entity';

@Injectable()
export class MetadataService {
  async getContactHypertexts() {
    return await this.metadatumRepository.find({
      select: [
        'collaboration_sponsor_hypertext',
        'info_hypertext',
        'lab_office_hypertext',
        'recruit_hypertext',
      ],
    });
  }
  async getAboutImgs() {
    return await this.metadatumRepository.find({
      select: ['about_heros'],
    });
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
