import TelegramBot from 'node-telegram-bot-api';
import { logger } from './utils/logger.js';
import { ENV } from './config/environment.js';
import { handleStart, handlePrice, handleStats, handleHelp } from './handlers/index.js';
import { MAIN_KEYBOARD } from './config/keyboards.js';

async function startBot() {
  try {
    logger.info('Starting bot with token:', ENV.BOT_TOKEN.slice(0, 10) + '...');
    
    const bot = new TelegramBot(ENV.BOT_TOKEN, {
      polling: true
    });

    // Test bot connection
    const botInfo = await bot.getMe();
    logger.info('Bot connected successfully:', botInfo.username);

    // Register command handlers
    bot.onText(/^\/start$/, async (msg) => {
      try {
        await handleStart(bot)(msg);
      } catch (error) {
        logger.error('Error in /start handler:', error);
        await bot.sendMessage(msg.chat.id, 'An error occurred. Please try again.', MAIN_KEYBOARD);
      }
    });

    bot.onText(/^\/price$/, async (msg) => {
      try {
        await handlePrice(bot)(msg);
      } catch (error) {
        logger.error('Error in /price handler:', error);
        await bot.sendMessage(msg.chat.id, 'An error occurred. Please try again.', MAIN_KEYBOARD);
      }
    });

    bot.onText(/^\/stats$/, async (msg) => {
      try {
        await handleStats(bot)(msg);
      } catch (error) {
        logger.error('Error in /stats handler:', error);
        await bot.sendMessage(msg.chat.id, 'An error occurred. Please try again.', MAIN_KEYBOARD);
      }
    });

    bot.onText(/^\/help$/, async (msg) => {
      try {
        await handleHelp(bot)(msg);
      } catch (error) {
        logger.error('Error in /help handler:', error);
        await bot.sendMessage(msg.chat.id, 'An error occurred. Please try again.', MAIN_KEYBOARD);
      }
    });

    // Error handling
    bot.on('polling_error', (error) => {
      logger.error('Polling error:', error);
    });

    bot.on('error', (error) => {
      logger.error('Bot error:', error);
    });

    logger.info('Bot startup completed');
    return bot;

  } catch (error) {
    logger.error('Fatal error during bot startup:', error);
    process.exit(1);
  }
}

// Start the bot
startBot().catch(error => {
  logger.error('Unhandled error:', error);
  process.exit(1);
});