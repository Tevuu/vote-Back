import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { VoteService } from './vote.service';
import { CreateVoteDTO } from './dto/vote.dto';
import { VoteEntity } from './entities/vote.entity';

@Controller('vote')
export class VoteController {
  constructor(private readonly voteService: VoteService) {}

  @Get()
  private async findAll(): Promise<VoteEntity[]> {
    return this.voteService.findAll();
  }

  @Get(':id')
  private async findById(@Param('id') id: number): Promise<VoteEntity> {
    return this.voteService.findById(id);
  }

  @Post()
  private async create(@Body() data: CreateVoteDTO): Promise<VoteEntity> {
    return this.voteService.create(data);
  }

  @Get('toVote/:voteId/:userId')
  private async toVote(
    @Param('voteId') voteId: number,
    @Param('userId') userId: number,
  ) {
    return this.voteService.toVote(voteId, userId);
  }

  @Delete(':id')
  private async destroy(@Param('id') id: number): Promise<VoteEntity> {
    return this.voteService.destroy(id);
  }
}
