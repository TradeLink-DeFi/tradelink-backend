import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Status } from '../enums/offer.enum';
import mongoose, { HydratedDocument } from 'mongoose';
import { Nft } from './nft.schema';
import { Token } from './token.schema';
import { User } from './user.schema';
import { Chain } from './chain.schema';

@Schema()
export class Offer {
  @Prop({
    name: 'token_in',
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
    default: [],
  })
  tokenIn: Token[];

  @Prop({
    name: 'token_out',
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }],
    default: [],
  })
  tokenOut: Token[];

  @Prop({ type: [{ name: 'token_in_amount', type: String }], default: [] })
  tokenInAmount: string[];

  @Prop({ type: [{ name: 'token_out_amount', type: String }], default: [] })
  tokenOutAmount: string[];

  @Prop({ type: [Nft], default: [] })
  nftIn: Nft[];

  @Prop({ type: [Nft], default: [] })
  nftOut: Nft[];

  @Prop({ name: 'status', enum: Status, default: Status.CREATE_OFFER_A })
  status: Status;

  @Prop({ name: 'note', type: String })
  note: string;

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;
  // 3 * 60 * 60 * 1000 -> 3 hours in milliseconds default timezone +0
  @Prop({ type: Date, default: Date.now() + 10800000 })
  deadline: Date;

  @Prop({
    name: 'trader_address',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  traderAddress: User;

  @Prop({
    name: 'fulfilled_address',
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  fulfilledAddress: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chain', require: true })
  chainA: Chain;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chain', require: true })
  chainB: Chain;
}

export type OfferDocument = HydratedDocument<Offer>;

export const OfferSchema = SchemaFactory.createForClass(Offer);
