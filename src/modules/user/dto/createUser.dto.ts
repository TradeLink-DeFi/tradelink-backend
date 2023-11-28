import { IsEthereumAddress } from 'class-validator';

export class CreateUserDto {
  @IsEthereumAddress()
  walletAddress: string;
}
