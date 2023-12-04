import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NftCollection } from './nft-collection.schema';

@Schema({ _id: false })
export class Nft {
  @Prop({ required: true, name: 'nft_id', type: String })
  nftId: string;

  @Prop({ required: true, name: 'nft_address', type: String })
  nftAddress: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ name: 'image_url', type: String })
  imageUrl?: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NftCollection',
    require: true,
  })
  nftCollection: NftCollection;
}

export type NftDocument = HydratedDocument<Nft>;

export const NftSchema = SchemaFactory.createForClass(Nft);
