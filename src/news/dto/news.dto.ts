import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateNewsDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(255, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  header: string;

  @ApiProperty()
  @IsString()
  @MaxLength(2000, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  content: string;

  @ApiProperty()
  @IsString()
  @MaxLength(4, {
    message: 'Заголовок голосования должен быть не более 255 символов',
  })
  grup: string;
}

export class UpdateNewsDTO extends PartialType(CreateNewsDTO) {
  likes?: number;
  likedPersonsId?: number[];
  dislikes?: number;
  dislikedPersonsId?: number[];
}
