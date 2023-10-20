import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @IsString()
  @Column({ nullable: false })
  firstName: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: false })
  secondName: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: false })
  thirdName: string;

  @ApiProperty()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: false })
  password: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, default: null })
  bio: string;

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Column({ type: 'simple-array', nullable: false })
  grup: string[];

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Column({ type: 'simple-array', nullable: false })
  roles: string[];

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, default: null })
  profile_picture: string;
}
