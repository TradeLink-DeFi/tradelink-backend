import {
  IsEnum,
  IsEthereumAddress,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { Status } from 'src/databases/enums/offer.enum';
import { Nft } from 'src/databases/schemas/nft.schema';

export class CreateOfferDto {
  @IsOptional()
  @IsUUID()
  chainId?: ObjectId;

  @IsOptional()
  @IsEthereumAddress()
  tokenIn?: string[];

  @IsOptional()
  @IsEthereumAddress()
  tokenOut?: string[];

  @IsOptional()
  @IsString()
  tokenInAmount?: string[];

  @IsOptional()
  @IsString()
  tokenOutAmount?: string[];

  @IsOptional()
  nftIn?: Nft[];

  @IsOptional()
  nftOut?: Nft[];

  @IsOptional()
  @IsEnum(Status)
  status?: Status;

  @IsOptional()
  @IsEthereumAddress()
  traderAddress?: string;

  // @IsOptional()
  // @IsEthereumAddress()
  // fulfilledAddress?: string;
}
