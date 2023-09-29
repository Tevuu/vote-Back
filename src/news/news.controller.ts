import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
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
  @Post('/')
  private async create(@Body() data) {
    return this.newsService.create(data);
  }

  @Put('/:id')
  private async update(@Param('id') id: number, @Body() data) {
    return this.newsService.update(id, data);
  }

  @Delete('/:id')
  private async destroy(@Param('id') id: number) {
    return this.newsService.destroy(id);
  }
}
