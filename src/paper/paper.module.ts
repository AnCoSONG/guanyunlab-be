import { Module } from '@nestjs/common';
import { PaperService } from './paper.service';
import { PaperController } from './paper.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Paper } from './entities/paper.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Paper])],
  controllers: [PaperController],
  providers: [PaperService],
})
export class PaperModule {}
