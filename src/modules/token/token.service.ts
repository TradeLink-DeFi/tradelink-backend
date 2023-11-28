import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Token } from 'src/databases/schemas/token.schema';
import { CreateTokenDto } from './dto/createToken.dto';

import { ObjectId } from 'mongodb';
import { Chain } from 'src/databases/schemas/chain.schema';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private tokenModel: Model<Token>,
    @InjectModel(Chain.name) private chainModel: Model<Chain>,
  ) {}

  async getAll() {
    try {
      return await this.tokenModel.find().exec();
    } catch (err) {
      throw err;
    }
  }

  async create(token: CreateTokenDto) {
    const newToken = await this.tokenModel.create(token);

    if (token.chainId) {
      token.chainId = new ObjectId(token.chainId);
      const chain = await this.chainModel
        .findOneAndUpdate(
          { _id: token.chainId },
          { $addToSet: { tokens: newToken._id } },
        )
        .exec();
      console.log(chain);
    }

    return newToken;
  }
}
