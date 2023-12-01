import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NftCollection } from 'src/databases/schemas/nft-collection.schema';
import { CreateNftCollection } from './dto/createNftCollection.dto';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectModel(NftCollection.name)
    private nftCollectionModel: Model<NftCollection>,
  ) {}

  async getAll() {
    try {
      return await this.nftCollectionModel.find().exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findById(id: string) {
    return await this.nftCollectionModel.findById(id).exec();
  }

  async create(nftCollection: CreateNftCollection) {
    return await this.nftCollectionModel.create(nftCollection);
  }
}
