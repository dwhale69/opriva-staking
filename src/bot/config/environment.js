import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { logger } from '../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '..', '..', '..');

// Load environment variables
config({ path: join(rootDir, '.env') });

// Validate and export environment variables
export const ENV = {
  BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  APP_URL: process.env.VITE_APP_URL,
  SUPABASE_URL: process.env.VITE_SUPABASE_URL,
  SUPABASE_KEY: process.env.VITE_SUPABASE_ANON_KEY
};

// Validate required environment variables
Object.entries(ENV).forEach(([key, value]) => {
  if (!value) {
    logger.error(`Missing required environment variable: ${key}`);
    throw new Error(`Missing required environment variable: ${key}`);
  }
});

logger.info('Environment variables loaded successfully');