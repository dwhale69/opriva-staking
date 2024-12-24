import { getTokenPrice, getStats } from './services.js';
import { MAIN_KEYBOARD, WELCOME_KEYBOARD, APP_URL } from './config.js';

export const handleStart = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  const firstName = msg.from.first_name;
  
  const welcomeMessage = `
Welcome ${firstName} to Opriva Bot! 🚀

Click below to launch the Opriva Terminal ⬇️
`;
  
  try {
    // Send initial welcome message with auto-open button
    await bot.sendMessage(chatId, welcomeMessage, WELCOME_KEYBOARD);
    
    // Send follow-up message with persistent keyboard
    const helpMessage = `
You can also use these commands:
/price - Get OPRV token price
/stats - View current statistics
/help - Show this help message
`;
    await bot.sendMessage(chatId, helpMessage, MAIN_KEYBOARD);
  } catch (error) {
    console.error('Error in start handler:', error);
    await bot.sendMessage(chatId, 'An error occurred. Please try again later.');
  }
};

export const handlePrice = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  try {
    const price = await getTokenPrice();
    await bot.sendMessage(
      chatId,
      `💰 Current OPRV Price: $${price}`,
      MAIN_KEYBOARD
    );
  } catch (error) {
    console.error('Error in price handler:', error);
    await bot.sendMessage(chatId, 'Unable to fetch price at the moment. Please try again later.');
  }
};

export const handleStats = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  try {
    const stats = await getStats();
    const message = `
📊 Opriva Statistics

👥 Total Stakers: ${stats.stakers}
💎 Total Value Locked: ${stats.tvl} OPRV
📈 Current APY: ${stats.apy}%
📣 Active Ads: ${stats.activeAds}
`;
    await bot.sendMessage(chatId, message, MAIN_KEYBOARD);
  } catch (error) {
    console.error('Error in stats handler:', error);
    await bot.sendMessage(chatId, 'Unable to fetch statistics at the moment. Please try again later.');
  }
};

export const handleHelp = (bot) => async (msg) => {
  const chatId = msg.chat.id;
  const helpMessage = `
Available commands:
/price - Get OPRV token price
/stats - View current statistics
/help - Show this help message

Use the menu buttons below for quick access! 👇
`;
  await bot.sendMessage(chatId, helpMessage, MAIN_KEYBOARD);
};