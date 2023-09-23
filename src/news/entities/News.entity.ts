import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: string;
}
