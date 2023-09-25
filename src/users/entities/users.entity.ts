import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  BaseEntity,
} from 'typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  secondName: string;

  @Column()
  thirdName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @ManyToMany(() => RolesEntity, (roles) => roles.users)
  @JoinTable({
    name: 'users_roles',
  })
  roles: RolesEntity[];
}
