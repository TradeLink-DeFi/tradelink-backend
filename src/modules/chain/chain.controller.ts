import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ChainService } from './chain.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Chain } from 'src/databases/schemas/chain.schema';

@Controller('chain')
export class ChainController {
  constructor(private readonly chainService: ChainService) {}

  @Get()
  // @UseGuards(AuthGuard)
  getAllChain() {
    return this.chainService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createChain(@Body() chain: Chain) {
    return this.chainService.create(chain);
  }
}
