import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Token } from './token.schema';

@Schema()
export class Chain {
  @Prop({ unique: true, name: 'chain_name', type: String })
  chainName: string;

  @Prop({ unique: true, required: true, name: 'chain_id', type: String })
  chainId: string;

  @Prop({ required: true, name: 'chain_selector', type: String })
  chainSelector: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Token' }] })
  tokens: Token[];
}

export type ChainDocument = HydratedDocument<Chain>;

export const ChainSchema = SchemaFactory.createForClass(Chain);
