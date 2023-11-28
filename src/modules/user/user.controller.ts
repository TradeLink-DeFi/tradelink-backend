import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/guard/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Get('me')
  @UseGuards(AuthGuard)
  getMe(@Req() request: Request) {
    return this.userService.findOne({
      walletAddress: request['user'].walletAddress?.toLowerCase(),
    });
  }
}
