import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  Query,
  // Delete,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Status } from 'src/databases/enums/offer.enum';
import { QueryOfferGet } from './dto/queryOffer.dto';
// import { ObjectId } from 'mongodb';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@Body() createOfferDto: CreateOfferDto, @Req() req: Request) {
    const walletAddress = req['user']['walletAddress'] as string;

    return this.offerService.create({
      ...createOfferDto,
      traderAddress: walletAddress,
    });
  }

  @Get()
  findAll(@Query() query: QueryOfferGet) {
    return this.offerService.findAll(query);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.offerService.findOne(id);
  // }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() body: { status: Status },
    @Req() req: Request,
  ) {
    const walletAddress = req['user']['walletAddress'] as string;
    const { status } = body;

    return this.offerService.updateStatus({ id, status, walletAddress });
  }

  @Get('history')
  @UseGuards(AuthGuard)
  history(@Req() req: Request, @Query('processing') processing: boolean) {
    const user = req['user'] as string;

    return this.offerService.history(user['_id'], processing);
  }
}
