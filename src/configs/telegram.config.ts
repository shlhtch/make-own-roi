import { ITelegramOptions } from 'src/telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

//создание конфига сесси ТГ
export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = ("здесь токен");
	if (!token) {
		throw new Error ('TELEGRAM_TOKEN не задан')
	}
	return {
		token,
		chatId: "здесь таргет, куда идут уведомления"
	}
}