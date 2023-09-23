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
  constructor(private readonly NewsService: NewsService) {}

  @Get('/')
  private async findAll() {
    return this.NewsService.findAll();
  }

  @Get('/:id')
  private async findById(@Param('id') id: number) {
    return this.NewsService.findById(id);
  }

  @Post('/')
  private async create(@Body() data) {
    return this.NewsService.create(data);
  }

  @Put('/:id')
  private async update(@Param('id') id: number, @Body() data) {
    return this.NewsService.update(id, data);
  }

  @Delete('/:id')
  private async destroy(@Param('id') id: number) {
    return this.NewsService.destroy(id);
  }
}
