import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, nullable: false })
  header: string;

  @Column({ length: 2000, nullable: false })
  content: string;

  @Column({ length: 4, nullable: false })
  grup: string;

  @Column({
    default: () => '(UNIX_TIMESTAMP())',
  })
  createdAt: number;
}
