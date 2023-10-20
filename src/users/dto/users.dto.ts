import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';

export class CreateUserDTO extends OmitType(UsersEntity, [
  'id',
  'profile_picture',
  'bio',
]) {}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class AuthUserDTO extends OmitType(UsersEntity, [
  'id',
  'firstName',
  'thirdName',
  'profile_picture',
  'bio',
  'secondName',
]) {}
