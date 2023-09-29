import { PartialType } from '@nestjs/swagger';

export class CreateRoleDTO {
  title: string;

  grup: string;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}
