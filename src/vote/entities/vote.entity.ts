import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('vote')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, type: 'varchar' })
  header: string;

  @Column({ type: 'simple-array' })
  elected: string[];

  @Column({ type: 'simple-array', default: null, nullable: true })
  votedPersonsId: number[];

  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @Column()
  grup: string;

  @Column({ type: 'varchar', nullable: false })
  endedAt: string;

  @Column({
    default: () => '(UNIX_TIMESTAMP())',
  })
  createdAt: number;
}
