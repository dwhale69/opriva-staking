import { supabase } from '../lib/supabase.js';
import { logger } from '../utils/logger.js';

export const getTokenPrice = async () => {
  try {
    const { data, error } = await supabase
      .from('statistics')
      .select('current_price')
      .single();
    
    if (error) throw error;
    
    const price = data?.current_price?.toFixed(2) || '1.25';
    logger.info('Price fetched:', { price });
    return price;
  } catch (error) {
    logger.error('Error fetching token price:', error);
    return '1.25'; // Fallback price
  }
};