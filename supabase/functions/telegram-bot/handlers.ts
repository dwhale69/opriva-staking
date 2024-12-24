import { Bot, Context } from 'https://deno.land/x/grammy@v1.21.1/mod.ts';
import { MESSAGES } from './config.ts';
import { saveUser, getPrice, getStats } from './db.ts';

export const handleStart = async (ctx: Context) => {
  const { id: telegramId, first_name: firstName, username } = ctx.message!.from;

  try {
    await saveUser(telegramId.toString(), username, firstName);
    await ctx.reply(MESSAGES.WELCOME(firstName));
  } catch (error) {
    console.error('Error in start handler:', error);
    await ctx.reply(MESSAGES.ERROR);
  }
};

export const handlePrice = async (ctx: Context) => {
  try {
    const price = await getPrice();
    await ctx.reply(MESSAGES.PRICE(price));
  } catch (error) {
    console.error('Error in price handler:', error);
    await ctx.reply(MESSAGES.PRICE_ERROR);
  }
};

export const handleStats = async (ctx: Context) => {
  try {
    const stats = await getStats();
    const message = `
📊 Opriva Statistics

👥 Total Stakers: ${stats.total_stakers?.toLocaleString() || '0'}
💎 Total Value Locked: ${stats.total_value_locked?.toLocaleString() || '0'} OPRV
📈 Current APY: ${stats.current_apy || '10'}%
📣 Active Ads: ${stats.active_ads || '0'}
`;
    await ctx.reply(message);
  } catch (error) {
    console.error('Error in stats handler:', error);
    await ctx.reply(MESSAGES.STATS_ERROR);
  }
};

export const handleHelp = async (ctx: Context) => {
  await ctx.reply(MESSAGES.HELP);
};