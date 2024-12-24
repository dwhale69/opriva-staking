// Commands configuration
export const COMMANDS = {
  START: '/start',
  PRICE: '/price',
  STATS: '/stats',
  HELP: '/help',
};

export const APP_URL = 'https://fascinating-sopapillas-2e83d3.netlify.app';

// Main menu keyboard configuration
export const MAIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [{text: '🚀 Launch Terminal', web_app: { url: APP_URL }}],
      ['💰 Price', '📊 Stats'],
      ['ℹ️ Help']
    ],
    resize_keyboard: true,
    persistent: true
  }
};

// Initial welcome keyboard with auto-opening web app
export const WELCOME_KEYBOARD = {
  reply_markup: {
    inline_keyboard: [[
      {
        text: '🚀 Open Terminal',
        web_app: { url: APP_URL }
      }
    ]]
  }
};