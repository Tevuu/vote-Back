import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from 'src/roles/entities/roles.entity';
import { UsersService } from './users.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersController } from './users.controller';
import { UsersEntity } from './entities/users.entity';
import { RolesModule } from 'src/roles/roles.module';
import { FilesModule } from 'src/files/files.module';

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
