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

  @Post()
  create(@Body() createTestDto: CreateReviewDto) {
    console.log('Received body:', JSON.stringify(createTestDto, null, 2));
    console.log('Account:', createTestDto.account);
    console.log('Leads:', JSON.stringify(createTestDto.leads, null, 2));
    console.log('Hello')
    return ('Hello')
  }

  @UsePipes(new ValidationPipe())
  @Post('notify')
  async notify(@Body() createReviewDto: CreateReviewDto) {
     const contacts = createReviewDto.contacts?.add;

    const name = contacts && contacts.length > 0 ? contacts[0].name : 'Не указано';

    const message = `Новый лид\n${name.replace(/[\[\]]/g, '')}`;
    return this.telegramService.sendMessage(message)
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.remove(+id);
  }
}
