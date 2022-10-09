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
import * as multer from 'multer';
import * as fs from 'fs';
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
      username: 'root',
      password: 'inlab@2022',
      database: 'gylab',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    UserModule,
    MulterModule.register({
      // dest: './datasets',
      storage: multer.diskStorage({
        destination: (req, file, cb) => {
          if (!fs.existsSync('./~gylab-static')) {
            fs.mkdirSync('./~gylab-static');
          }
          cb(null, './~gylab-static');
        },
        filename: (req, file, cb) => {
          cb(null, file.originalname);
        },
      }),
    }),
    MetadataModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
