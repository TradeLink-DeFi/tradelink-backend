import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { NftCollection } from 'src/databases/schemas/nft-collection.schema';
import { CreateNftCollection } from './dto/createNftCollection.dto';
import { QueryGet } from './dto/query.dto';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectModel(NftCollection.name)
    private nftCollectionModel: Model<NftCollection>,
  ) {}

  async getAll(query: QueryGet) {
    const { chainId } = query;

    const schema = chainId
      ? [
          {
            $lookup: {
              from: 'chains',
              localField: 'chain',
              foreignField: '_id',
              as: 'chain',
            },
          },
          {
            $match: {
              'chain.chainId': chainId,
            },
          },
        ]
      : [
          {
            $lookup: {
              from: 'chain',
              localField: 'chain',
              foreignField: '_id',
              as: 'chain',
            },
          },
        ];

    try {
      const nftCollection = await this.nftCollectionModel
        .aggregate(schema)
        .exec();
      return nftCollection;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findById(id: string) {
    return await this.nftCollectionModel.findById(id).exec();
  }

  async create(nftCollection: CreateNftCollection) {
    return await this.nftCollectionModel.create({
      ...nftCollection,
      chain: new ObjectId(nftCollection.chainId),
    });
  }
}
