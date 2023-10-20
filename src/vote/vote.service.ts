import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDTO } from './dto/vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteEntity) private readonly vote: Repository<VoteEntity>,
  ) {}

  public async findAll(): Promise<VoteEntity[]> {
    return this.vote.createQueryBuilder().select().getMany();
  }

  public async findById(id: number): Promise<VoteEntity> {
    return this.vote
      .createQueryBuilder()
      .select()
      .where('id = :id', { id })
      .getOne();
  }

  public async create(data: CreateVoteDTO) {
    // const id = await this.vote
    //   .createQueryBuilder()
    //   .insert()
    //   .values(data)
    //   .execute()
    //   .then((response) => response.identifiers[0].id);
    // return this.findById(id);
    return data.elected;
  }

  public async toVote(voteId: number, userId: number) {
    const votedPersonsId = await this.vote
      .createQueryBuilder('vote')
      .select('vote.votedPersonsId')
      .where('id = :id', { id: voteId })
      .getMany()
      .then((response) => response[0].votedPersonsId);

    await this.vote
      .createQueryBuilder()
      .update()
      .set({
        votedPersonsId: [...votedPersonsId, userId],
      })
      .where('id = :id', { id: voteId })
      .execute();

    return this.findById(voteId);
  }
}
