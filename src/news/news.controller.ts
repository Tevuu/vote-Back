import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from '../config/files.utils';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  private async findAll() {
    return this.newsService.findAll();
  }

  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return this.newsService.findById(id);
  }

  @Get('getByGrup/:grup')
  private async findByGrup(@Param('grup') grup: string) {
    return this.newsService.findByGrup(grup);
  }

  @Post('')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads/newsPictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  private async createWithSomeImages(@Body() data, @UploadedFiles() files) {
    return this.newsService.createWithSomeImages(data, files);
  }

  @Put('/:id')
  @UseInterceptors(
    FilesInterceptor('image', 10, {
      storage: diskStorage({
        destination: './uploads/newsPictures',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  private async update(
    @Param('id') id: number,
    @Body() data,
    @UploadedFiles() files,
  ) {
    return this.newsService.update(id, data, files);
  }

  @Delete('/:id')
  private async destroy(@Param('id') id: number) {
    return this.newsService.destroy(id);
  }

  @Get('/getPhotosList/:id')
  private async getPhotosList(@Param('id') id: number) {
    return this.newsService.getPhotosList(id);
  }

  @Get('/deleteImage/:id')
  private async deleteImage(@Param('id') id: number) {
    return this.newsService.deleteImage(id);
  }
}
