import { MAIN_KEYBOARD } from '../config/keyboards.js';
import { logger } from '../utils/logger.js';

export const handleHelp = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  logger.info('Processing /help command for:', { chatId });

  const helpMessage = `
Available commands:
/price - Get OPRV token price
/stats - View current statistics
/help - Show this help message

Use the menu buttons below for quick access! 👇
`;

  try {
    await bot.sendMessage(chatId, helpMessage, MAIN_KEYBOARD);
    logger.info('Help message sent:', { chatId });
  } catch (error) {
    logger.error('Error in help handler:', error);
    await bot.sendMessage(
      chatId,
      'An error occurred. Please try again.',
      MAIN_KEYBOARD
    );
  }
};