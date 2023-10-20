import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('news')
export class NewsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @MaxLength(255, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  @Column({ length: 255, nullable: false })
  header: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2000, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  @Column({ length: 2000, nullable: false })
  content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(4, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  @Column({ length: 4, nullable: false })
  grup: string;

  @ApiProperty({
    type: String,
    isArray: true,
    nullable: true,
  })
  @Column({ type: 'simple-array', nullable: true, default: null })
  photos: string[];

  @Column({
    default: () => '(UNIX_TIMESTAMP())',
  })
  createdAt: number;
}
