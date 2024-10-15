import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { TelegramService } from 'src/telegram/telegram.service';

@Controller('review')
export class ReviewController {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly telegramService: TelegramService
  ) {}
  // запрос с получением данных по вебхуку со стороннего сервиса
  @Post()
  create(@Body() createTestDto: CreateReviewDto) {
    console.log('Received body:', JSON.stringify(createTestDto, null, 2));
    console.log('Account:', createTestDto.account);
    console.log('Somthing:', JSON.stringify(createTestDto.leads, null, 2));
    console.log('sample')
    return ('sample')
  }

  // запрос для отправки уведомления в TG
  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() createReviewDto: CreateReviewDto) {
     const contacts = createReviewDto.contacts?.add;

    const name = contacts && contacts.length > 0 ? contacts[0].name : 'Не указано';

    const message = `Название события\n${name.replace(/[\[\]]/g, '')}`;
    console.log(message)
    return this.telegramService.sendMessage(message)
  }
}
