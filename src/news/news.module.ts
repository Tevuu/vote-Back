import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsEntity } from './entities/News.entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity]), FilesModule],
  controllers: [NewsController],
  providers: [NewsService],
})
export class NewsModule {}
