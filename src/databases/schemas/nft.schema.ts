import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Nft {
  @Prop({ unique: true, name: 'nft_id', type: String })
  nftId: string;

  @Prop({ required: true, name: 'nft_address', type: String })
  nftAddress: string;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ name: 'image_url', type: String })
  imageUrl: string;
}

export type NftDocument = HydratedDocument<Nft>;

export const NftSchema = SchemaFactory.createForClass(Nft);
