import { serve } from 'https://deno.fresh.dev/std@0.168.0/http/server.ts';
import { Bot, webhookCallback } from 'https://deno.land/x/grammy@v1.21.1/mod.ts';
import { COMMANDS } from './config.ts';
import { handleStart, handlePrice, handleStats, handleHelp } from './handlers.ts';

// Initialize bot with webhook mode instead of polling
const bot = new Bot(Deno.env.get('TELEGRAM_BOT_TOKEN')!);

// Register command handlers
bot.command(COMMANDS.START.slice(1), handleStart);
bot.command(COMMANDS.PRICE.slice(1), handlePrice);
bot.command(COMMANDS.STATS.slice(1), handleStats);
bot.command(COMMANDS.HELP.slice(1), handleHelp);

// Handle menu button clicks
bot.hears('💰 Price', handlePrice);
bot.hears('📊 Stats', handleStats);
bot.hears('ℹ️ Help', handleHelp);

// Handle errors
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Create webhook handler
const handleUpdate = webhookCallback(bot, 'std/http');

// Serve the handler
serve(async (req) => {
  try {
    if (req.method === 'POST') {
      const url = new URL(req.url);
      if (url.searchParams.get('secret') !== Deno.env.get('FUNCTION_SECRET')) {
        return new Response('Unauthorized', { status: 401 });
      }
      return await handleUpdate(req);
    }
    return new Response('OK');
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
});