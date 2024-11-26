import { ITelegramOptions } from 'src/telegram/telegram.interface';
import { ConfigService } from '@nestjs/config';

//создание конфига сесси ТГ
export const getTelegramConfig = (configService: ConfigService): ITelegramOptions => {
	const token = ("6999507157:AAEmcBmBFJO0lE_t9tmlc_h4WZEdrbSe_Ak");
	if (!token) {
		throw new Error ('TELEGRAM_TOKEN не задан')
	}
	return {
		token,
		chatId: "-1002442696522"
	}
}