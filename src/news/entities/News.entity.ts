import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

import { DateTime } from 'luxon';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  grup: string;

  @Column({
    default: () => '(UNIX_TIMESTAMP())',
  })
  createdAt: number;
}
