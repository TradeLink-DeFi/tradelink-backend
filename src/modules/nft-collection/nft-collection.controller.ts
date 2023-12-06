import { Controller, Get, Post, Body, UseGuards, Query } from '@nestjs/common';

import { NftCollectionService } from './nft-collection.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { CreateNftCollection } from './dto/createNftCollection.dto';
import { QueryGet } from './dto/query.dto';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftCollectionService: NftCollectionService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getAllChain(@Query() query: QueryGet) {
    return this.nftCollectionService.getAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  createChain(@Body() nftCollection: CreateNftCollection) {
    return this.nftCollectionService.create(nftCollection);
  }
}
