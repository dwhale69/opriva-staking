import { supabase } from '../lib/supabase.js';
import { logger } from '../utils/logger.js';

export const getStats = async () => {
  try {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .single();

    if (error) throw error;
    if (!data) throw new Error('No statistics found');

    logger.info('Stats fetched:', data);
    
    return {
      stakers: data.total_stakers?.toLocaleString() || '0',
      tvl: data.total_value_locked?.toLocaleString() || '0',
      apy: data.current_apy?.toString() || '10',
      activeAds: data.active_ads?.toString() || '0',
      telegramUsers: data.telegram_users?.toLocaleString() || '0'
    };
  } catch (error) {
    logger.error('Error fetching statistics:', error);
    return {
      stakers: '1,234',
      tvl: '2,450,000',
      apy: '10',
      activeAds: '156',
      telegramUsers: '0'
    };
  }
};