import TelegramBot from 'node-telegram-bot-api';
import { handleStart, handlePrice, handleStats, handleHelp } from './handlers/index.js';
import { COMMANDS } from './config/commands.js';
import { initSupabase } from '../lib/supabase.js';
import { MAIN_KEYBOARD, WELCOME_KEYBOARD } from './config/keyboards.js';

export class TelegramBotService {
  constructor(token) {
    if (!token) {
      throw new Error('Bot token is required');
    }

    // Initialize Supabase
    initSupabase();

    // Create bot instance with appropriate options
    this.bot = new TelegramBot(token, { 
      polling: {
        interval: 300,
        autoStart: true,
        params: {
          timeout: 10
        }
      }
    });

    this.setupErrorHandlers();
    this.registerCommands();
    this.setupMessageHandlers();
  }

  setupErrorHandlers() {
    this.bot.on('polling_error', (error) => {
      console.error('Polling error:', error);
      // Restart polling after error
      this.bot.stopPolling().then(() => {
        setTimeout(() => this.bot.startPolling(), 5000);
      });
    });

    this.bot.on('error', (error) => {
      console.error('Bot error:', error);
    });

    process.on('SIGINT', () => this.shutdown());
    process.on('SIGTERM', () => this.shutdown());
  }

  setupMessageHandlers() {
    // Handle text messages
    this.bot.on('message', (msg) => {
      const chatId = msg.chat.id;
      
      // Handle menu button clicks
      switch (msg.text) {
        case '💰 Price':
          handlePrice(this.bot)(msg);
          break;
        case '📊 Stats':
          handleStats(this.bot)(msg);
          break;
        case 'ℹ️ Help':
          handleHelp(this.bot)(msg);
          break;
      }
    });
  }

  registerCommands() {
    // Register command handlers with exact matching
    this.bot.onText(/^\/start$/, async (msg) => {
      try {
        await handleStart(this.bot)(msg);
      } catch (error) {
        console.error('Error handling /start command:', error);
        this.bot.sendMessage(msg.chat.id, 'An error occurred. Please try again.');
      }
    });

    this.bot.onText(/^\/price$/, handlePrice(this.bot));
    this.bot.onText(/^\/stats$/, handleStats(this.bot));
    this.bot.onText(/^\/help$/, handleHelp(this.bot));
  }

  shutdown() {
    console.log('Shutting down bot gracefully...');
    this.bot.stopPolling();
    process.exit(0);
  }
}