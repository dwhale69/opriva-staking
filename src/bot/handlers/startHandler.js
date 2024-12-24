import { MAIN_KEYBOARD, WELCOME_KEYBOARD } from '../config/keyboards.js';
import { saveUser } from '../services/userService.js';
import { logger } from '../utils/logger.js';

export const handleStart = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  const { first_name: firstName, username } = msg.from;

  logger.info('Processing /start command for:', { chatId, firstName });

  try {
    // Send initial message first
    await bot.sendMessage(
      chatId,
      `Welcome ${firstName} to Opriva Terminal! 🚀\n\nClick below to launch:`,
      WELCOME_KEYBOARD
    );

    // Save user data
    try {
      await saveUser(chatId.toString(), username, firstName);
      logger.info('User saved successfully:', { chatId });
    } catch (saveError) {
      logger.error('Failed to save user:', saveError);
    }

    // Send help message with persistent keyboard
    await bot.sendMessage(
      chatId,
      'You can also use these commands:\n/price - Get OPRV token price\n/stats - View statistics\n/help - Show help',
      MAIN_KEYBOARD
    );

  } catch (error) {
    logger.error('Error in start handler:', error);
    try {
      await bot.sendMessage(
        chatId,
        'An error occurred. Please try /start again.'
      );
    } catch (msgError) {
      logger.error('Failed to send error message:', msgError);
    }
  }
};