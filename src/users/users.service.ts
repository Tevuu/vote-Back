import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
  ) {}

  public async findAll(): Promise<UsersEntity[]> {
    return this.users.createQueryBuilder().select().getMany();
  }

  public async findById(id: number): Promise<UsersEntity> {
    return this.users.findOne({
      where: { id },
      relations: {
        roles: true,
      },
    });
  }

  public async create(data: CreateUserDTO): Promise<UsersEntity> {
    const userId = await this.users
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((user) => user.identifiers[0].id);

    return this.findById(userId);
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
}
