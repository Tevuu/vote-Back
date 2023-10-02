import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewsEntity } from './entities/News.entity';
import { CreateNewsDTO } from './dto/news.dto';
import { FilesService } from 'src/files/files.service';

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
}
