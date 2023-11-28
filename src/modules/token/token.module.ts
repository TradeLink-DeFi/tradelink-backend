import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';

import { TokenController } from './token.controller';
import { TokenService } from './token.service';
import { Token, TokenSchema } from 'src/databases/schemas/token.schema';
import { Chain, ChainSchema } from 'src/databases/schemas/chain.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Token.name, schema: TokenSchema },
      { name: Chain.name, schema: ChainSchema },
    ]),
  ],
  controllers: [TokenController],
  providers: [TokenService, JwtService],
})
export class TokenModule {}
