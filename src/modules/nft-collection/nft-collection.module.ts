import { Module } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { NftCollectionController } from './nft-collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NftCollection,
  NftCollectionSchema,
} from 'src/databases/schemas/nft-collection.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NftCollection.name, schema: NftCollectionSchema },
    ]),
  ],
  controllers: [NftCollectionController],
  providers: [NftCollectionService, JwtService],
})
export class NftCollectionModule {}
