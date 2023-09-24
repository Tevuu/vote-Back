import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './entities/News.entity';
import { CreateNewsDTO } from './dto/news.dto';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private readonly news: Repository<NewsEntity>,
  ) {}

  public async findAll(): Promise<NewsEntity[]> {
    return this.news.createQueryBuilder().select().getMany();
  }

  public async findById(id: number): Promise<NewsEntity> {
    return this.news
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async create(data: CreateNewsDTO): Promise<NewsEntity> {
    const newsId = await this.news
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((response) => response.identifiers[0].id);

    return this.findById(newsId);
  }

  public async update(id: number, data: CreateNewsDTO): Promise<NewsEntity> {
    await this.news
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async destroy(id: number): Promise<NewsEntity> {
    const deletedNews = await this.findById(id);

    await this.news
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    return deletedNews;
  }
}
