import { MAIN_KEYBOARD } from '../config/keyboards.js';
import { getTokenPrice } from '../services/priceService.js';
import { logger } from '../utils/logger.js';

export const handlePrice = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  logger.info('Processing /price command for:', { chatId });

  try {
    const price = await getTokenPrice();
    await bot.sendMessage(
      chatId,
      `💰 Current OPRV Price: $${price}`,
      MAIN_KEYBOARD
    );
    logger.info('Price message sent:', { chatId, price });
  } catch (error) {
    logger.error('Error in price handler:', error);
    await bot.sendMessage(
      chatId, 
      'Unable to fetch price at the moment. Please try again later.',
      MAIN_KEYBOARD
    );
  }
};