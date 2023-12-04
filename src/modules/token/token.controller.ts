import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';

import { TokenService } from './token.service';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Token } from 'src/databases/schemas/token.schema';
import { QueryGet } from './dto/query.dto';

@Controller('token')
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @Get()
  @UseGuards(AuthGuard)
  getAllChain(@Query() query: QueryGet) {
    return this.tokenService.getAll(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  createChain(@Body() token: Token) {
    return this.tokenService.create(token);
  }
}
