export const COMMANDS = {
  START: '/start',
  PRICE: '/price',
  STATS: '/stats',
  HELP: '/help'
};

export const MESSAGES = {
  WELCOME: (firstName: string) => 
    `Welcome ${firstName} to Opriva Terminal! 🚀\n\nClick below to launch:`,
  PRICE: (price: string) => 
    `💰 Current OPRV Price: $${price}`,
  HELP: `
Available commands:
/price - Get OPRV token price
/stats - View current statistics
/help - Show this help message
`,
  ERROR: 'An error occurred. Please try again.',
  PRICE_ERROR: 'Unable to fetch price at the moment.',
  STATS_ERROR: 'Unable to fetch statistics at the moment.'
};