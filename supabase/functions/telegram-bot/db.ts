import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Statistics {
  total_stakers: number;
  total_value_locked: number;
  current_apy: number;
  active_ads: number;
  current_price: number;
}

export const saveUser = async (
  telegramId: string,
  username: string | undefined,
  firstName: string
) => {
  return await supabase.from('telegram_users').upsert({
    telegram_id: telegramId,
    username,
    first_name: firstName,
    last_active_at: new Date().toISOString()
  });
};

export const getPrice = async () => {
  const { data } = await supabase
    .from('statistics')
    .select('current_price')
    .single();
  return data?.current_price || '1.25';
};

export const getStats = async () => {
  const { data } = await supabase
    .from('statistics')
    .select('*')
    .single();
  return data as Statistics;
};