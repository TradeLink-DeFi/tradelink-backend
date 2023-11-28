import {
  Controller,
  Get,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from './guard/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Get('get-challenge-message')
  getChallengeMessage() {
    return this.authService.getChallengeMessage();
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.signature);
  }

  @HttpCode(HttpStatus.OK)
  @Get('verify-access-token')
  @UseGuards(AuthGuard)
  verify() {
    return { message: 'Pass' };
  }
}
