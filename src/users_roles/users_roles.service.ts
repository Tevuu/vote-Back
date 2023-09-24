import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRolesEntity } from './entities/users_roles.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class UsersRolesService {
  constructor(
    @InjectRepository(UsersRolesEntity)
    private readonly usersRoles: Repository<UsersRolesEntity>,
    private readonly usersService: UsersService,
  ) {}

  async giveRole(userId: number, roleId: number) {
    await this.usersRoles
      .createQueryBuilder()
      .insert()
      .values({ userId, roleId })
      .execute();

    // return this.usersService.findById(userId);
  }
}
