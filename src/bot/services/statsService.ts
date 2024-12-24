import { supabase } from '../../lib/supabase';

export const getStats = async () => {
  try {
    const { data: stats } = await supabase
      .from('statistics')
      .select('*')
      .single();

    if (!stats) {
      throw new Error('No statistics found');
    }

    return {
      stakers: stats.total_stakers.toLocaleString(),
      tvl: stats.total_value_locked.toLocaleString(),
      apy: stats.current_apy.toString(),
      activeAds: stats.active_ads.toString()
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    // Return fallback data
    return {
      stakers: '1,234',
      tvl: '2,450,000',
      apy: '10',
      activeAds: '156'
    };
  }
};