import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';
import { RolesService } from 'src/roles/roles.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly roles: RolesService,
  ) {}

  public async findAll(): Promise<UsersEntity[]> {
    return this.users.find({
      relations: {
        roles: true,
      },
    });
  }

  public async findById(id: number): Promise<UsersEntity> {
    return this.users.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  public async findByEmail(email: string): Promise<UsersEntity> {
    return this.users.findOne({
      where: { email },
      relations: {
        roles: true,
      },
    });
  }

  public async create(data: CreateUserDTO): Promise<UsersEntity> {
    const id = await this.users
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((user) => user.identifiers[0].id);

    await this.getRoleByTitle(id, 'Student');

    return this.findById(id);
  }

  public async update(id: number, data: UpdateUserDTO): Promise<UsersEntity> {
    await this.users
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async destroy(id: number): Promise<UsersEntity> {
    const deletedUser = await this.findById(id);

    await this.users
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    return deletedUser;
  }

  async getRoleByTitle(userId: number, roleName: string | number) {
    await this.users
      .createQueryBuilder()
      .relation(UsersEntity, 'roles')
      .of(userId)
      .add((await this.roles.getByName(roleName)).id);

    return this.findById(userId);
  }

  async removeRoleByTitle(userId, roleName) {
    await this.users
      .createQueryBuilder()
      .relation(UsersEntity, 'roles')
      .of(userId)
      .remove((await this.roles.getByName(roleName)).id);

    return this.findById(userId);
  }

  async findAllByGrup(grup: string) {
    return this.users.find({
      where: {
        roles: [
          {
            grup,
          },
        ],
      },
      relations: {
        roles: true,
      },
    });
  }
}
