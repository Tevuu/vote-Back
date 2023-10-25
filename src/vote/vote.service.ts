import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDTO, UpdateVoteDTO } from './dto/vote.dto';
import { UsersService } from 'src/users/users.service';
import { findIndex } from 'rxjs';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(VoteEntity) private readonly vote: Repository<VoteEntity>,
    private readonly users: UsersService,
  ) {}

  public async findAll(): Promise<VoteEntity[]> {
    return this.vote.createQueryBuilder().select().getMany();
  }

  public async findById(id: number): Promise<VoteEntity> {
    try {
      return this.vote
        .createQueryBuilder()
        .select()
        .where('id = :id', { id })
        .getOne();
    } catch {
      throw new NotFoundException({
        message: 'Запрошенное голосование не найдено',
      });
    }
  }

  public async create(data: CreateVoteDTO): Promise<VoteEntity> {
    const id = await this.vote
      .createQueryBuilder()
      .insert()
      .values({ ...data, votes: data.elected.map(() => 0) })
      .execute()
      .then((response) => response.identifiers[0].id);

    return this.findById(id);
  }

  public async toVote(voteId: number, userId: number, elected: string) {
    try {
      const vote = await this.vote
        .createQueryBuilder('vote')
        .select()
        .where('id = :id', { id: voteId })
        .getOne();

      const user = await this.users.findById(userId);

      if (!user || !vote) {
        return false;
      }

      const electedIndex = await vote.elected.findIndex(
        (item) => item === elected,
      );

      const votedPersons = vote.votedPersonsId ?? [];

      await this.vote
        .createQueryBuilder()
        .update()
        .set({
          voteCount: vote.voteCount + 1,
          votedPersonsId: [...votedPersons, userId],
          votes: vote.votes.map((item, index) => {
            if (index === electedIndex) {
              return Number(item) + 1;
            }

            return item;
          }),
        })
        .where('id = :id', { id: voteId })
        .execute();

      return true;
    } catch {
      return false;
    }
  }

  public async destroy(id: number): Promise<VoteEntity> {
    await this.vote
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async update(id: number, data: UpdateVoteDTO): Promise<VoteEntity> {
    const vote = await this.findById(id);

    if (!vote) {
      throw new NotFoundException({
        message: 'Запрошенное голосование не найдено',
      });
    }

    await this.vote
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', { id })
      .execute();

    return this.findById(id);
  }

  public async getAllByGrup(grup: string): Promise<VoteEntity[]> {
    return this.vote
      .createQueryBuilder()
      .select()
      .where('grup = :grup', { grup })
      .orWhere('grup = :NKE', { NKE: 'NKE' })
      .getMany();
  }

  public async getWinner(id: number) {
    const vote = await this.findById(id);

    let winnerVotes = 0;

    for (let i = 0; i < vote.votes.length; i++) {
      if (vote.votes[i] > winnerVotes) {
        winnerVotes = vote.votes[i];
      }
    }

    const winnerVotesIndex = vote.votes.findIndex(
      (item) => item == winnerVotes,
    );

    const winnerEmail = vote.elected[winnerVotesIndex];

    return this.users.getNameByEmail(winnerEmail);
  }

  public async getVotesCountByEmail(email: string, voteId: number) {
    const vote = await this.findById(voteId);

    const electedIndex = vote.elected.findIndex((item) => item == email);

    return vote.votes[electedIndex];
  }

  public async getVotesByGrup(voteId: number, grup: string | number) {
    const vote = await this.findById(voteId);
    const votedPersons = [];

    for (let i = 0; i < vote.votedPersonsId.length; i++) {
      votedPersons.push(await this.users.findById(vote.votedPersonsId[i]));
    }

    return votedPersons.filter((item) =>
      item.grup.find((item) => item == grup),
    );
  }
}
