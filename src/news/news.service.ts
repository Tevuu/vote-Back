import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import { NewsEntity } from './entities/News.entity';
import { CreateNewsDTO, UpdateNewsDTO } from './dto/news.dto';
import { FilesService } from 'src/files/files.service';
import { response } from 'express';

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private readonly news: Repository<NewsEntity>,
    private readonly filesService: FilesService,
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

  public async create(data: CreateNewsDTO, file): Promise<NewsEntity> {
    if (file) {
      const createdFile = await this.filesService.uploadedFile(file);

      const newsId = await this.news
        .createQueryBuilder()
        .insert()
        .values({ ...data, photos: [createdFile.data.filename] })
        .execute()
        .then((response) => response.identifiers[0].id);

      return this.findById(newsId);
    }

    const newsId = await this.news
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((response) => response.identifiers[0].id);

    return this.findById(newsId);
  }

  public async createWithSomeImages(data, files) {
    const createdFile = await this.filesService.uploadMultipleFiles(files);
    const newsImages = createdFile.data.map((item) => item.filename);

    const newsId = await this.news
      .createQueryBuilder()
      .insert()
      .values({ ...data, photos: [...newsImages] })
      .execute()
      .then((response) => response.identifiers[0].id);

    return this.findById(newsId);
  }

  public async update(
    id: number,
    data: UpdateNewsDTO,
    files,
  ): Promise<NewsEntity> {
    if (files.length) {
      const createdFile = await this.filesService.uploadMultipleFiles(files);
      const newsImages = createdFile.data.map((item) => item.filename);

      await this.news
        .createQueryBuilder()
        .update()
        .set({
          header: data.header,
          grup: data.grup,
          content: data.content,
          photos: [...newsImages],
        })
        .where('id = :id', { id })
        .execute();
    } else {
      await this.news
        .createQueryBuilder()
        .update()
        .set({
          header: data.header,
          grup: data.grup,
          content: data.content,
        })
        .where('id = :id', { id })
        .execute();
    }

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

  public async findByGrup(grup: string) {
    return this.news
      .createQueryBuilder()
      .select()
      .where('grup = :grup', { grup })
      .getMany();
  }

  public async getPhotosList(id: number) {
    const photos = await this.news
      .createQueryBuilder('news')
      .select('news.photos')
      .where('id = :id', { id })
      .getOne();

    return photos ? photos.photos : [];
  }

  public async deleteImage(id: number) {
    const news = await this.findById(id);

    news.photos.map((photo) =>
      fs.unlink(`./uploads/newsPictures/${photo}`, (err) => {
        if (err) throw err;
      }),
    );

    await this.news
      .createQueryBuilder()
      .update()
      .set({
        photos: [],
      })
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async toLike(newsId: number, userId: number) {
    const news = await this.findById(newsId);
    if (news) {
      const likedPersons = news.likedPersonsId ?? [];

      if (likedPersons.find((item) => item == userId)) {
        return false;
      }

      await this.news
        .createQueryBuilder()
        .update()
        .set({
          likedPersonsId: [...likedPersons, userId],
        })
        .where('id = :id', { id: newsId })
        .execute();

      return this.findById(newsId);
    }

    throw new NotFoundException({
      message: 'Запрошеная новость не найдена',
    });
  }
}
