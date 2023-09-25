import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateRoleDTO } from './dto/roles.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesEntity)
    private readonly roles: Repository<RolesEntity>,
  ) {}

  public async getAll(): Promise<RolesEntity[]> {
    return this.roles.createQueryBuilder().select().getMany();
  }

  public async getById(id: number): Promise<RolesEntity> {
    return this.roles
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async getByName(name: string | number): Promise<RolesEntity> {
    return this.roles
      .createQueryBuilder()
      .select()
      .where('title = :name', { name })
      .getOne();
  }

  public async create(data: CreateRoleDTO): Promise<RolesEntity> {
    const roleId = await this.roles
      .createQueryBuilder()
      .insert()
      .values(data)
      .execute()
      .then((role) => role.identifiers[0].id);

    return this.getById(roleId);
  }
}
