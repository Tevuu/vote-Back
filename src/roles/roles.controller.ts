import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesEntity } from './entities/roles.entity';
import { CreateRoleDTO } from './dto/roles.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Get()
  private async getAll(): Promise<RolesEntity[]> {
    return this.rolesService.getAll();
  }

  @Get('/:id')
  private async getById(@Param('id') id: number): Promise<RolesEntity> {
    return this.rolesService.getById(id);
  }

  @Post()
  private async create(@Body() data: CreateRoleDTO): Promise<RolesEntity> {
    return this.rolesService.create(data);
  }
}
