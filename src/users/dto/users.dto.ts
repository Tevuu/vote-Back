import { OmitType, PartialType } from '@nestjs/swagger';
import { UsersEntity } from '../entities/users.entity';

export class CreateUserDTO extends OmitType(UsersEntity, ['id', 'roles']) {}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
