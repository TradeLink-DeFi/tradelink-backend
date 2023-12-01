import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { DatabasesModule } from './databases/databases.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChainModule } from './modules/chain/chain.module';
import { TokenModule } from './modules/token/token.module';
import { NftCollectionModule } from './modules/nft-collection/nft-collection.module';
import { OfferModule } from './modules/offer/offer.module';

@Module({
  imports: [
    ConfigsModule,
    DatabasesModule,
    AuthModule,
    UserModule,
    ChainModule,
    TokenModule,
    NftCollectionModule,
    OfferModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
