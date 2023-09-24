import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users_roles')
export class UsersRolesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  roleId: number;
}
