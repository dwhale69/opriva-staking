import { createClient } from '@supabase/supabase-js';
import { ENV } from '../config/environment.js';
import { logger } from '../utils/logger.js';

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_KEY) {
  throw new Error('Missing Supabase configuration');
}

logger.info('Initializing Supabase client with URL:', ENV.SUPABASE_URL);

export const supabase = createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase
      .from('telegram_users')
      .select('count')
      .single();
      
    if (error) throw error;
    
    logger.info('Supabase connection successful');
    return true;
  } catch (error) {
    logger.error('Supabase connection failed:', error);
    throw error;
  }
}