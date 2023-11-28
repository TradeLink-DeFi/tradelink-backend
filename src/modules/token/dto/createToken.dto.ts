import {
  IsBoolean,
  IsEnum,
  IsEthereumAddress,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ObjectId } from 'mongodb';
import { TokenType } from 'src/databases/enums/token.enum';

export class CreateTokenDto {
  @IsEthereumAddress()
  tokenAddress: string;

  @IsEnum(TokenType)
  type: TokenType;

  @IsString()
  name: string;

  @IsString()
  symbol: string;

  @IsOptional()
  @IsNumber()
  decimals?: number;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  chainId?: ObjectId;
}
