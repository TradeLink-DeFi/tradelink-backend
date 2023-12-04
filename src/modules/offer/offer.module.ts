import { Module } from '@nestjs/common';
import { OfferService } from './offer.service';
import { OfferController } from './offer.controller';
import { JwtService } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from 'src/databases/schemas/offer.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Offer.name, schema: OfferSchema }]),
    UserModule,
  ],
  controllers: [OfferController],
  providers: [OfferService, JwtService],
})
export class OfferModule {}
