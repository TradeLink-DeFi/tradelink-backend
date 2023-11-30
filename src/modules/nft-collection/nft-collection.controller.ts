import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { NftCollectionService } from './nft-collection.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { NftCollection } from 'src/databases/schemas/nft-collection.schema';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftCollectionService: NftCollectionService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllChain() {
    return this.nftCollectionService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createChain(@Body() nftCollection: NftCollection) {
    return this.nftCollectionService.create(nftCollection);
  }
}
