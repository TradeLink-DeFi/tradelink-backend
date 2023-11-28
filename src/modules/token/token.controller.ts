import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { TokenService } from './token.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Token } from 'src/databases/schemas/token.schema';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllChain() {
    return this.tokenService.getAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  createChain(@Body() token: Token) {
    return this.tokenService.create(token);
  }
}
