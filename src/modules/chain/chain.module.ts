import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Chain, ChainSchema } from 'src/databases/schemas/chain.schema';
import { ChainController } from './chain.controller';
import { ChainService } from './chain.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chain.name, schema: ChainSchema }]),
  ],
  controllers: [ChainController],
  providers: [ChainService, JwtService],
  exports: [ChainService],
})
export class ChainModule {}
