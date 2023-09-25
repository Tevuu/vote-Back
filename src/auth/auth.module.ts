import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([UsersEntity])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
