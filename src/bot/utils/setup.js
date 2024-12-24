import { mkdir } from 'fs/promises';
import { join } from 'path';
import { logger } from './logger.js';
import { ENV } from '../config/environment.js';
import { testSupabaseConnection } from '../lib/supabase.js';

export async function setupEnvironment() {
  try {
    // Validate environment variables
    const requiredVars = {
      'BOT_TOKEN': ENV.BOT_TOKEN,
      'SUPABASE_URL': ENV.SUPABASE_URL,
      'SUPABASE_KEY': ENV.SUPABASE_KEY,
      'APP_URL': ENV.APP_URL
    };

    for (const [key, value] of Object.entries(requiredVars)) {
      if (!value) {
        throw new Error(`Missing ${key}`);
      }
      logger.info(`${key} is set`);
    }

    // Validate bot token format
    if (!ENV.BOT_TOKEN.match(/^\d+:[A-Za-z0-9_-]{35}$/)) {
      throw new Error('Invalid bot token format');
    }

    // Create logs directory
    await mkdir(join(process.cwd(), 'logs'), { recursive: true });
    
    // Test Supabase connection
    await testSupabaseConnection();

    logger.info('Environment setup completed successfully');
    return true;
  } catch (error) {
    logger.error('Environment setup failed:', error);
    throw error;
  }
}