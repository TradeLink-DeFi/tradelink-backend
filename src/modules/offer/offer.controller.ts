import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  UseGuards,
  Req,
  // Delete,
} from '@nestjs/common';
import { OfferService } from './offer.service';
import { CreateOfferDto } from './dto/createOffer.dto';
import { AuthGuard } from '../auth/guard/auth.guard';
import { Status } from 'src/databases/enums/offer.enum';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  // STEP: 1 Create Offer (Pending)
  // STEP: 2 Update Steup (Approve -> Fulfill)
  // STEP: 3 Update Steup (Execute -> Offer)
  // STEP: 4 Update Steup (Confirm -> Fulfill)

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return this.offerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
  //   return this.offerService.update(+id, updateOfferDto);
  // }
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

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.offerService.remove(+id);
  // }
}
