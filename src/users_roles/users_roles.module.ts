import { Module } from '@nestjs/common';
import { UsersRolesService } from './users_roles.service';
import { UsersRolesController } from './users_roles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRolesEntity } from './entities/users_roles.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UsersRolesEntity])],
  controllers: [UsersRolesController],
  providers: [UsersRolesService],
})
export class UsersRolesModule {}
