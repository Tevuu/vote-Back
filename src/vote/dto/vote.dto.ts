import { OmitType, PartialType } from '@nestjs/swagger';
import { VoteEntity } from '../entities/vote.entity';

export class CreateVoteDTO extends OmitType(VoteEntity, [
  'id',
  'votedPersonsId',
  'createdAt',
  'voteCount',
  'votes',
  'extended',
]) {}

export class UpdateVoteDTO extends PartialType(CreateVoteDTO) {}
