import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeatEntity } from './models/feat.entity';
import { FeatCompletionEntity } from './models/feat-completion.entity';
import { FeatRankEntity } from './models/feat-rank.entity';
import { FeatService } from './feat.service';
import { FeatController } from './feat.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FeatEntity,
      FeatCompletionEntity,
      FeatRankEntity,
    ]),
  ],
  providers: [FeatService],
  controllers: [FeatController],
})
export class FeatModule {}
