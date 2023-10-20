import { OmitType, PartialType } from '@nestjs/swagger';
import { VoteEntity } from '../entities/vote.entity';

export class CreateVoteDTO extends OmitType(VoteEntity, [
  'id',
  'votedPersonsId',
  'createdAt',
  'voteCount',
  'elected',
]) {
  elected: string;
}

export class UpdateVoteDTO extends PartialType(CreateVoteDTO) {}
