import { PartialType } from '@nestjs/swagger';

export class CreateNewsDTO {
  header: string;

  content: string;

  grup: string;
}

export class UpdateNewsDTO extends PartialType(CreateNewsDTO) {}
