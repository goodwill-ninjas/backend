import { FeatRankEntity } from '../../feat/models/feat-rank.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UserCompletedFeat {
  @ApiProperty({
    description: 'User ID',
    example: '1',
  })
  userId: number;

  @ApiProperty({
    description: 'Feat ID',
    example: 'foo@bar.com',
  })
  featId: number;

  @ApiProperty({
    description: 'Feat Name',
    example: 'Blood Donor',
  })
  featName: string;

  @ApiProperty({
    description: 'Feat description',
    example: 'User has donated blood [1, 3, 5] times',
  })
  featDescription: string;

  @ApiProperty({
    description: 'Ranks of the given feat that user has achieved',
    example: 'foo@bar.com',
  })
  achievedRanks: Array<FeatRankEntity> | null;

  @ApiProperty({
    description: 'Rank that is next to be achieved by the user',
    example: 'foo@bar.com',
  })
  nextRanks: Array<FeatRankEntity> | null;
}
