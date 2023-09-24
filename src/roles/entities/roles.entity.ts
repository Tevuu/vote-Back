import { UsersEntity } from 'src/users/entities/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity('roles')
export class RolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @ManyToMany(() => UsersEntity, (users) => users.roles)
  users: UsersEntity[];
}
