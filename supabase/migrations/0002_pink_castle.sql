/*
  # Add Telegram Stats Fields

  1. Changes
    - Add current_price to statistics table
    - Add telegram_users count
    - Add last_price_update field
*/

ALTER TABLE statistics
ADD COLUMN IF NOT EXISTS current_price numeric DEFAULT 1.25,
ADD COLUMN IF NOT EXISTS telegram_users integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_price_update timestamptz DEFAULT now();

-- Function to update telegram users count
CREATE OR REPLACE FUNCTION update_telegram_stats()
RETURNS trigger AS $$
BEGIN
  UPDATE statistics
  SET telegram_users = (SELECT COUNT(*) FROM users WHERE telegram_id IS NOT NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for telegram users count
CREATE TRIGGER update_telegram_stats_trigger
  AFTER INSERT OR UPDATE OR DELETE ON users
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_telegram_stats();