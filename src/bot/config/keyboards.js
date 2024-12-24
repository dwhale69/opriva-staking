import { ENV } from './environment.js';

export const MAIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{ text: '🚀 Launch Terminal', web_app: { url: ENV.APP_URL } }],
      ['💰 Price', '📊 Stats'],
      ['ℹ️ Help']
    ],
    resize_keyboard: true,
    persistent: true
  }
};

export const WELCOME_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [[
      {
        text: '🚀 Open Terminal',
        web_app: { url: ENV.APP_URL }
      }
    ]]
  }
};