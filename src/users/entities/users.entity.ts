import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  firstName: string;

  @Column({ nullable: false })
  secondName: string;

  @Column({ nullable: false })
  thirdName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: true, default: null })
  bio: string;

  @Column({ type: 'simple-array', nullable: false })
  grup: string[];

  @Column({ type: 'simple-array', nullable: false })
  roles: string[];

  @Column({ nullable: true, default: null })
  profile_picture: string;
}
