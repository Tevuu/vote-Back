import { Module } from '@nestjs/common';
import { VoteService } from './vote.service';
import { VoteController } from './vote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoteEntity } from './entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VoteEntity])],
  controllers: [VoteController],
  providers: [VoteService],
})
export class VoteModule {}
