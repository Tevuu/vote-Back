import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VoteEntity } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { CreateVoteDTO, UpdateVoteDTO } from './dto/vote.dto';
import { UsersService } from 'src/users/users.service';

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
}
