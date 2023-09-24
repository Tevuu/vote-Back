import { PartialType } from '@nestjs/swagger';

export class CreateRoleDTO {
  title: string;

  description: string;
}

export class UpdateRoleDTO extends PartialType(CreateRoleDTO) {}
