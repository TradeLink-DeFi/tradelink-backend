import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigsModule } from './configs/configs.module';
import { DatabasesModule } from './databases/databases.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { ChainModule } from './modules/chain/chain.module';
import { TokenModule } from './modules/token/token.module';

@Module({
  imports: [
    ConfigsModule,
    DatabasesModule,
    AuthModule,
    UserModule,
    ChainModule,
    TokenModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
