import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsModule } from './news/news.module';
import { PaperModule } from './paper/paper.module';
import { ProjectModule } from './project/project.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';
import { MetadataModule } from './metadata/metadata.module';
import { AuthModule } from './auth/auth.module';
import { ImgModule } from './img/img.module';
import { gylabMulterOptions } from './upload/multer.config';
@Module({
  imports: [
    NewsModule,
    PaperModule,
    ProjectModule,
    MemberModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'gylab',
      password: 'inlab@2022',
      database: 'gylab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    MulterModule.register(gylabMulterOptions),
    MetadataModule,
    AuthModule,
    ImgModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
