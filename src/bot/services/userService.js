import { supabase } from '../lib/supabase.js';
import { logger } from '../utils/logger.js';

export const saveUser = async (telegramId, username, firstName) => {
  if (!telegramId) {
    throw new Error('Telegram ID is required');
  }

  try {
    logger.info('Saving user:', { telegramId, username, firstName });

    const { data, error } = await supabase
      .from('telegram_users')
      .upsert({
        telegram_id: telegramId,
        username: username || null,
        first_name: firstName,
        last_active_at: new Date().toISOString()
      }, {
        onConflict: 'telegram_id',
        returning: 'minimal'
      });

    if (error) {
      logger.error('Database error while saving user:', error);
      throw error;
    }

    logger.info('User saved successfully:', { telegramId });
    return data;
  } catch (error) {
    logger.error('Error in saveUser:', error);
    throw error;
  }
};

export const updateUserActivity = async (telegramId) => {
  if (!telegramId) return;

  try {
    const { error } = await supabase
      .from('telegram_users')
      .update({ last_active_at: new Date().toISOString() })
      .eq('telegram_id', telegramId);

    if (error) {
      logger.error('Error updating user activity:', error);
    }
  } catch (error) {
    logger.error('Error in updateUserActivity:', error);
  }
};