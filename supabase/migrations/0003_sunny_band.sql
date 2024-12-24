/*
  # Add Telegram Bot Schema

  1. New Tables
    - `telegram_users`
      - `id` (uuid, primary key)
      - `telegram_id` (text, unique)
      - `username` (text)
      - `first_name` (text)
      - `last_active_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `telegram_users` table
    - Add policy for authenticated users to read telegram users
    - Add policy for service role to manage telegram users

  3. Changes
    - Add trigger to update statistics table telegram_users count
*/

-- Create telegram_users table
CREATE TABLE IF NOT EXISTS telegram_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id text UNIQUE NOT NULL,
  username text,
  first_name text,
  last_active_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE telegram_users ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Allow service role full access to telegram_users"
  ON telegram_users
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to read telegram_users"
  ON telegram_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update telegram users count in statistics
CREATE OR REPLACE FUNCTION update_telegram_user_count()
RETURNS trigger AS $$
BEGIN
  UPDATE statistics
  SET 
    telegram_users = (SELECT COUNT(*) FROM telegram_users),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for telegram users count
CREATE TRIGGER update_telegram_stats
  AFTER INSERT OR DELETE OR UPDATE ON telegram_users
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_telegram_user_count();