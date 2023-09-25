import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersEntity } from './entities/users.entity';
import { CreateUserDTO, UpdateUserDTO } from './dto/users.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  private getAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  private getById(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.findById(id);
  }

  @Post()
  private create(@Body() data: CreateUserDTO): Promise<UsersEntity> {
    return this.usersService.create(data);
  }

  @Put(':id')
  private update(
    @Param('id') id: number,
    @Body() data: UpdateUserDTO,
  ): Promise<UsersEntity> {
    return this.usersService.update(id, data);
  }

  @Delete(':id')
  private destroy(@Param('id') id: number): Promise<UsersEntity> {
    return this.usersService.destroy(id);
  }

  @Get('/getRole/:userId/:roleName')
  private async getRole(
    @Param('userId') userId: number,
    @Param('roleName') roleName: string | number,
  ) {
    return this.usersService.getRole(userId, roleName);
  }

  @Get('/removeRole/:userId/:roleName')
  private async removeRole(
    @Param('userId') userId: number,
    @Param('roleName') roleName: string | number,
  ) {
    return this.usersService.removeRole(userId, roleName);
  }
}
