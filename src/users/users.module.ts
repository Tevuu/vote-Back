import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { UsersEntity } from './entities/users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { FilesModule } from 'src/files/files.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    FilesModule,
    RolesModule,
    TypeOrmModule.forFeature([UsersEntity, RolesEntity]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
