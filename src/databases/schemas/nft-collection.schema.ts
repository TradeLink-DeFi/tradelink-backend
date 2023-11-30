import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Chain } from './chain.schema';

@Schema()
export class NftCollection {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, name: 'token_address', type: String })
  address: string;

  @Prop({ default: true, name: 'is_active', type: Boolean })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chain', require: true })
  chain: Chain;
}

export type NftCollectionDocument = HydratedDocument<NftCollection>;

export const NftCollectionSchema = SchemaFactory.createForClass(NftCollection);
