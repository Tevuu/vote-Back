import { UsersEntity } from 'src/users/entities/users.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  BaseEntity,
} from 'typeorm';

@Entity('roles')
export class RolesEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true, default: null })
  grup: string;

  @ManyToMany(() => UsersEntity, (users) => users.roles)
  users: UsersEntity[];
}
