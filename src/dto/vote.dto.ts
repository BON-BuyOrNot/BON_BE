import { IsEnum, IsOptional, IsString } from 'class-validator';
import { VoteType } from '../entities/vote.entity';

export class CreateVoteDto {
  @IsEnum(VoteType)
  type: VoteType;

  @IsOptional()
  @IsString()
  comment?: string;
}

export class VoteResponseDto {
  id: number;
  type: VoteType;
  comment?: string;
  user: {
    id: number;
    username: string;
  };
  product: {
    id: number;
    name: string;
  };
  createdAt: Date;
}
