import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { hashSync } from 'bcryptjs';

@Injectable()
export class UserService {
  async findByName(name: string) {
    return await this.userRepository.findOneBy({ username: name });
  }
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const password = hashSync(createUserDto.password, 10);
    createUserDto = { ...createUserDto, password };
    const item = this.userRepository.create(createUserDto);
    return await this.userRepository.save(item);
  }

  async findAll() {
    return await this.userRepository.find({
      select: ['id', 'username'],
    });
  }

  async findOne(id: string) {
    const item = await this.userRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `User with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.userRepository.merge(itemToBeUpdate, updateUserDto);
    return await this.userRepository.save(updated);
  }

  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
