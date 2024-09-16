import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TelegramModule } from './telegram/telegram.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getTelegramConfig } from './configs/telegram.config';

@Module({
  imports: [TelegramModule, ReviewModule, TelegramModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: getTelegramConfig
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
