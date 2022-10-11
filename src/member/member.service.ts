import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member, MemberRole } from './entities/member.entity';

@Injectable()
export class MemberService {
  async findMemberGroupByIdentity() {
    const result = {};
    for (const identity of ['teacher', 'student', 'intern']) {
      result[identity] = await this.findMemberByIdentity(
        identity as MemberRole,
      );
    }
    return result;
  }
  async findMemberByIdentity(identity: MemberRole) {
    if (['student', 'teacher', 'intern'].indexOf(identity) === -1) {
      throw new BadRequestException(
        `Identity ${identity} is not valid, it should be one of student, teacher, intern`,
      );
    }
    return await this.memberRepository.find({
      where: { identity },
      select: ['avatar', 'cn_name', 'cn_title', 'en_name', 'en_title', 'id'],
    });
  }
  constructor(
    @InjectRepository(Member) private memberRepository: Repository<Member>,
  ) {}
  async create(createMemberDto: CreateMemberDto) {
    const item = this.memberRepository.create(createMemberDto);
    return await this.memberRepository.save(item);
  }

  async findAll() {
    return await this.memberRepository.find({
      select: ['avatar', 'cn_name', 'cn_title', 'en_name', 'en_title', 'id'],
    });
  }

  async findOne(id: string) {
    const item = await this.memberRepository.findOneBy({ id });
    if (!item) {
      throw new NotFoundException(
        `News with id ${id} does not exist in the database`,
      );
    }
    return item;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto) {
    const itemToBeUpdate = await this.findOne(id);
    const updated = this.memberRepository.merge(
      itemToBeUpdate,
      updateMemberDto,
    );
    return await this.memberRepository.save(updated);
  }

  async remove(id: string) {
    return await this.memberRepository.delete(id);
  }
}
