import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ethers } from 'ethers';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  getChallengeMessage(): { message: string } {
    return { message: 'SIGN_IN_TO_TRADELINK' };
  }

  async login(signature: string): Promise<{ accessToken: string }> {
    const { message } = this.getChallengeMessage();
    console.log(message);

    try {
      const decodedAddress = ethers
        .verifyMessage(message, signature)
        .toLowerCase();
      let user = await this.userService.findOne({
        walletAddress: decodedAddress,
      });
      if (!user) {
        user = await this.userService.create({
          walletAddress: decodedAddress,
        });
      }
      const payload = { walletAddress: decodedAddress, _id: user._id };
      return { accessToken: await this.jwtService.signAsync(payload) };
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException();
    }
  }
}
