/*
  # Add Telegram Users Count Update

  1. Changes
    - Add telegram_users column to statistics table
    - Create function and trigger for maintaining telegram user count
*/

-- Add telegram_users column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'statistics' 
    AND column_name = 'telegram_users'
  ) THEN
    ALTER TABLE statistics 
    ADD COLUMN telegram_users integer DEFAULT 0;
  END IF;
END $$;

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION update_telegram_user_count()
RETURNS trigger AS $$
BEGIN
  UPDATE statistics
  SET telegram_users = (
    SELECT COUNT(*)::integer 
    FROM telegram_users
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;