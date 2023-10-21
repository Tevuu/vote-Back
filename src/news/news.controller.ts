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
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateNewsDTO } from './dto/news.dto';

@ApiTags('Новости')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Возвращает множество новостей' })
  @ApiOkResponse({
    description: 'Множество новостей',
  })
  @Get('/')
  private async findAll() {
    return this.newsService.findAll();
  }

  @ApiOperation({ summary: 'Возвращает новость' })
  @ApiOkResponse({
    description: 'Новость, согласно заданному запросу',
  })
  @ApiNotFoundResponse({ description: 'Запрошенная новость не найдена' })
  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return this.newsService.findById(id);
  }

  @Get('getByGrup/:grup')
  private async findByGrup(@Param('grup') grup: string) {
    return this.newsService.findByGrup(grup);
  }

  @ApiOperation({ summary: 'Создает новость' })
  @ApiOkResponse({
    description: 'Созданная новость в соответствии заданному запросу',
  })
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

  @ApiOperation({ summary: 'Обновляет запрашиваемую новость' })
  @ApiOkResponse({ description: 'Обновленная новость' })
  @ApiNotFoundResponse({ description: 'Запрашиваемая новость не найдена' })
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
    @Body() data: UpdateNewsDTO,
    @UploadedFiles() files,
  ) {
    return this.newsService.update(id, data, files);
  }

  @ApiOperation({ summary: 'Удаляет запрашиваемую новость' })
  @ApiOkResponse({ description: 'Удаленная новость' })
  @ApiNotFoundResponse({ description: 'Запрашиваемая новость не найдена' })
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
