import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';

import { NftCollectionService } from './nft-collection.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateNftCollection } from './dto/createNftCollection.dto';

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
  createChain(@Body() nftCollection: CreateNftCollection) {
    return this.nftCollectionService.create(nftCollection);
  }
}
