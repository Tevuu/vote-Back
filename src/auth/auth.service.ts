import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { config } from 'dotenv';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { AuthUserDTO } from 'src/users/dto/users.dto';

config();

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly users: Repository<UsersEntity>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: AuthUserDTO) {
    const user = await this.validateUser(data);
    return this.generateToken(user);
  }

  private async generateToken(user: UsersEntity) {
    const payload = { ...user };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(userData: AuthUserDTO) {
    const user = await this.usersService.findByEmail(userData.email);

    if (user && user.password === userData.password) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

  async tokenCheck(token: string) {
    try {
      return await this.jwtService.decode(token);
    } catch {
      return false;
    }
  }
}
