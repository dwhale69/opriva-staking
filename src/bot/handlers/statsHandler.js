import { MAIN_KEYBOARD } from '../config/keyboards.js';
import { getStats } from '../services/statsService.js';
import { logger } from '../utils/logger.js';

export const handleStats = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  logger.info('Processing /stats command for:', { chatId });

  try {
    const stats = await getStats();
    const message = `
📊 Opriva Statistics

👥 Total Stakers: ${stats.stakers}
💎 Total Value Locked: ${stats.tvl} OPRV
📈 Current APY: ${stats.apy}%
📣 Active Ads: ${stats.activeAds}
🤖 Telegram Users: ${stats.telegramUsers}
`;
    await bot.sendMessage(chatId, message, MAIN_KEYBOARD);
    logger.info('Stats message sent:', { chatId });
  } catch (error) {
    logger.error('Error in stats handler:', error);
    await bot.sendMessage(
      chatId,
      'Unable to fetch statistics at the moment. Please try again later.',
      MAIN_KEYBOARD
    );
  }
};