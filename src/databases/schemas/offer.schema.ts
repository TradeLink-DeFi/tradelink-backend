import { Prop, Schema } from '@nestjs/mongoose';
import { Status } from '../enums/offer.enum';
import mongoose from 'mongoose';
import { Nft } from './nft.schema';

@Schema()
export class Offer {
  @Prop({
    name: 'token_in',
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'token' }],
    default: [],
  })
  tokenIn: string[];

  @Prop({
    name: 'token_out',
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'token' }],
    default: [],
  })
  tokenOut: string[];

  @Prop({ type: [{ name: 'token_in_amount', type: String }], default: [] })
  tokenInAmount: string[];

  @Prop({ type: [{ name: 'token_out_amount', type: String }], default: [] })
  tokenOutAmount: string[];

  @Prop({ type: Nft })
  nftIn: Nft[];

  @Prop({ type: Nft })
  nftOut: Nft[];

  @Prop({ name: 'status', enum: Status, default: Status.PENDING })
  status: Status;

  @Prop({
    name: 'trader_address',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  traderAddress: string;

  @Prop({
    name: 'fulfilled_address',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  })
  fulfilledAddress: string;
}
