import { Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Metadatum } from './entities/metadatum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Metadatum])],
  controllers: [MetadataController],
  providers: [MetadataService],
})
export class MetadataModule {}
