interface TrimmedFeatRankEntity {
  rank: number;
  requirement: number;
  experience_award: number;
}

export interface TrimmedFeatEntity {
  name: string;
  ranks: Array<TrimmedFeatRankEntity>;
}
