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
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll(@Query() query: QueryOfferGet) {
    return this.offerService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updateStatus(
    @Param('id') id: string,
    @Body() status: Status,
    @Req() req: Request,
  ) {
    const walletAddress = req['user']['walletAddress'] as string;

    return this.offerService.updateStatus({ id, status, walletAddress });
  }
}
