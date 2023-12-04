import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from 'src/databases/schemas/offer.schema';
import { ObjectId } from 'mongodb';
import { CreateOfferDto } from './dto/createOffer.dto';
import { IUpdateStatus } from './interfaces/updateStatus.interface';
import { Status } from 'src/databases/enums/offer.enum';
import { QueryOfferGet } from './dto/queryOffer.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name)
    private offerModel: Model<Offer>,
    private readonly userService: UserService,
  ) {}

  async create(createOfferDto: CreateOfferDto) {
    try {
      const tokenIn = createOfferDto.tokenIn.map(
        (token) => new ObjectId(token),
      );
      const tokenOut = createOfferDto.tokenOut.map(
        (token) => new ObjectId(token),
      );
      // const fulfilledAddress = new ObjectId(createOfferDto.fulfilledAddress);
      const trader = await this.userService.findOne({
        walletAddress: createOfferDto.traderAddress,
      });

      return await this.offerModel.create({
        ...createOfferDto,
        traderAddress: trader._id,
        // fulfilledAddress,
        tokenIn,
        tokenOut,
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  async findAll(query: QueryOfferGet) {
    const { chainId, nftId, status, nftCollectionId } = query;
    const schema = [
      {
        $lookup: {
          from: 'chains',
          localField: 'chainA',
          foreignField: '_id',
          as: 'chainA',
        },
      },
      {
        $lookup: {
          from: 'chains',
          localField: 'chainB',
          foreignField: '_id',
          as: 'chainB',
        },
      },
      {
        $match: {
          status: +status,
          $and: [
            chainId
              ? {
                  $or: [
                    { 'chainA.chainId': chainId },
                    { 'chainB.chainId': chainId },
                  ],
                }
              : {},
            nftId && {
              $or: [
                { nftIn: { $elemMatch: { nftId: nftId } } },
                { nftOut: { $elemMatch: { nftId: nftId } } },
              ],
            },
            nftCollectionId
              ? {
                  $or: [
                    {
                      nftIn: {
                        $elemMatch: {
                          nftCollection: nftCollectionId,
                        },
                      },
                    },
                    {
                      nftOut: {
                        $elemMatch: {
                          nftCollection: nftCollectionId,
                        },
                      },
                    },
                  ],
                }
              : {},
          ],
        },
      },
    ];

    return await this.offerModel.aggregate(schema).exec();
  }

  async findOne(id: string) {
    return await this.offerModel.findById(id).exec();
  }

  async updateStatus({ id, status, walletAddress }: IUpdateStatus) {
    try {
      const offer = await this.offerModel
        .findById(id)
        .populate('traderAddress')
        .populate('fulfilledAddress')
        .exec();
      if (offer.status > status) throw Error('Invalid status update');

      const user = await this.userService.findOne({ walletAddress });

      const isTraderAddress =
        offer.traderAddress.walletAddress === walletAddress;
      const isFulfilledAddress =
        offer.fulfilledAddress?.walletAddress === walletAddress;

      if (isTraderAddress && status === Status.ACCEPT_A) {
        return await this.offerModel.updateOne(
          {
            _id: id,
            traderAddress: offer.traderAddress['_id'],
          },
          { status },
        );
      } else if (isFulfilledAddress && status === Status.ACCEPT_B) {
        return await this.offerModel.updateOne(
          {
            _id: id,
            fulfilledAddress: user._id,
          },
          { status },
        );
      } else if (status === Status.ACCEPT_B && !isFulfilledAddress) {
        return await this.offerModel.updateOne(
          { _id: id },
          { fulfilledAddress: user._id, status },
        );
      }
    } catch (err) {
      console.log(err);
      throw err;
    }

    throw new Error("Order isn't matched");
  }
}
