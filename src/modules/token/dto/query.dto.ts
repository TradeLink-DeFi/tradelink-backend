import { IsOptional, IsString } from 'class-validator';
// import { ObjectId } from 'mongoose';

export class QueryGet {
  @IsOptional()
  @IsString()
  chainId?: string;
}
