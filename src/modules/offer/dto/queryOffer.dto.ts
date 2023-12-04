import { IsEnum, IsOptional, IsString } from 'class-validator';
import { Status } from 'src/databases/enums/offer.enum';

export class QueryOfferGet {
  @IsOptional()
  @IsString()
  chainId?: string;

  @IsOptional()
  @IsString()
  nftId?: string;

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsString()
  nftCollectionId?: string;
}
