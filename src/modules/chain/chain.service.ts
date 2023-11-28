import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chain } from 'src/databases/schemas/chain.schema';

@Injectable()
export class ChainService {
  constructor(@InjectModel(Chain.name) private chainModel: Model<Chain>) {}

  async getAll() {
    console.log(await this.chainModel.find().populate('tokens').exec());
    try {
      return await this.chainModel.find().populate('tokens').exec();
    } catch (err) {
      return await this.chainModel.find().exec();
    }
  }

  async findById(id: string) {
    return await this.chainModel.findById(id).exec();
  }

  async create(chain: Chain) {
    return await this.chainModel.create(chain);
  }
}
