import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';

export class CreateUserDTO extends OmitType(UsersEntity, ['id']) {}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}

export class AuthUserDTO extends OmitType(UsersEntity, [
  'id',
  'firstName',
  'thirdName',
]) {}
