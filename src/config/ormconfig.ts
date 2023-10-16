import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { UsersEntity } from 'src/users/entities/users.entity';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { NewsEntity } from 'src/news/entities/News.entity';
import { VoteEntity } from 'src/vote/entities/vote.entity';

config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  host: configService.get('DB_HOST'),
  port: configService.get('DB_PORT'),
  username: configService.get('DB_USERNAME'),
  password: configService.get('DB_PASSWORD'),
  database: configService.get('DB_DATABASE'),
  entities: [UsersEntity, RolesEntity, NewsEntity, VoteEntity],
  migrations: [__dirname + '/**/migration/*{.ts,.js}'],
  migrationsRun: true,
});
