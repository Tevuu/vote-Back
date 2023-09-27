import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthUserDTO} from 'src/users/dto/users.dto';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly usersService: UsersService,
  ) {}

  async login(data: AuthUserDTO) {
    const user = await this.users
      .createQueryBuilder()
      .select()
      .where('email = :email', { email: data.email })
      .andWhere('password = :password', { password: data.password })
      .getOne();

    if (user) {
      return this.usersService.findById(user.id);
    }

    return false;
  }
}
