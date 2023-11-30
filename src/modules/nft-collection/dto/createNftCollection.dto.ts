import {
  IsBoolean,
  IsEthereumAddress,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateNftCollection {
  @IsEthereumAddress()
  address: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsUUID()
  chainId?: ObjectId;
}
