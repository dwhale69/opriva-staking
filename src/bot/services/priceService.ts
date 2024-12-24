import { supabase } from '../../lib/supabase';

export const getTokenPrice = async () => {
  try {
    const { data: stats } = await supabase
      .from('statistics')
      .select('current_price')
      .single();
    
    return stats?.current_price || '1.25';
  } catch (error) {
    console.error('Error fetching token price:', error);
    return '1.25'; // Fallback price
  }
};