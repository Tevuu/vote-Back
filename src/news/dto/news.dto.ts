import { PartialType } from '@nestjs/swagger';

export class CreateNewsDTO {
  title: string;

  content: string;
}

export class UpdateNewsDTO extends PartialType(CreateNewsDTO) {}
