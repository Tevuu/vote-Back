import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, RolesEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
