import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsString,
  IsInt,
  MaxLength,
  MinLength,
  IsBoolean,
} from 'class-validator';

@Entity('vote')
export class VoteEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Заголовок голосования должен быть не менее 3 символов',
  })
  @MaxLength(100, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  @Column({ length: 255, type: 'varchar' })
  header: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Column({ type: 'simple-array' })
  elected: string[];

  @ApiProperty({
    type: Number,
    isArray: true,
  })
  @Column({ type: 'simple-array' })
  votes: number[];

  @ApiProperty({
    type: String,
    isArray: true,
    nullable: true,
  })
  @Column({ type: 'simple-array', default: null, nullable: true })
  votedPersonsId: number[];

  @ApiProperty()
  @IsInt()
  @Column({ type: 'int', default: 0 })
  voteCount: number;

  @ApiProperty()
  @IsString()
  @MinLength(3, {
    message: 'Группа должна быть не менее 3 символов',
  })
  @MaxLength(4, {
    message: 'Группа должна быть не более 4 символов',
  })
  @Column()
  grup: string;

  @ApiProperty()
  @IsString()
  @Column({ type: 'varchar', nullable: false })
  endedAt: string;

  @ApiProperty()
  @IsBoolean()
  @Column({ type: 'bool', nullable: false, default: false })
  extended: boolean;

  @Column({
    default: () => '(UNIX_TIMESTAMP())',
  })
  createdAt: number;
}
