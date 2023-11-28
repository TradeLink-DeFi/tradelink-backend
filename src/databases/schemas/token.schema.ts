import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { TokenType } from '../enums/token.enum';
import { Chain } from './chain.schema';
import { IsEnum } from 'class-validator';

@Schema()
export class Token {
  @Prop({ required: true, name: 'token_address', type: String })
  tokenAddress: string;

  @Prop({ required: true, enum: TokenType })
  @IsEnum(TokenType)
  type: TokenType;

  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  symbol: string;

  @Prop({ default: 18, type: Number })
  decimals: number;

  @Prop({ default: true, name: 'is_active', type: Boolean })
  isActive: boolean;

  // @Prop({ name: 'image_url', type: String })
  // imageUrl: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Chain', require: true })
  chain: Chain;
}

export type TokenDocument = HydratedDocument<Token>;

export const TokenSchema = SchemaFactory.createForClass(Token);
