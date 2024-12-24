/*
  # Initial Schema Setup for Opriva

  1. New Tables
    - users
      - Stores user account information
      - Links to Telegram users
    - staking_positions
      - Records user staking positions
      - Tracks amount staked and rewards
    - advertisements
      - Stores active and past advertisements
    - statistics
      - Stores platform-wide statistics
      
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id text UNIQUE,
  wallet_address text UNIQUE,
  created_at timestamptz DEFAULT now(),
  last_active_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Staking positions table
CREATE TABLE IF NOT EXISTS staking_positions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  amount numeric NOT NULL CHECK (amount >= 0),
  rewards_earned numeric DEFAULT 0 CHECK (rewards_earned >= 0),
  staked_at timestamptz DEFAULT now(),
  last_claim_at timestamptz DEFAULT now()
);

ALTER TABLE staking_positions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own staking positions"
  ON staking_positions
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- Advertisements table
CREATE TABLE IF NOT EXISTS advertisements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  budget numeric NOT NULL CHECK (budget > 0),
  duration_hours integer NOT NULL CHECK (duration_hours > 0),
  status text CHECK (status IN ('pending', 'active', 'completed', 'cancelled')),
  started_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE advertisements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own advertisements"
  ON advertisements
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Anyone can view active ads"
  ON advertisements
  FOR SELECT
  USING (status = 'active');

-- Statistics table
CREATE TABLE IF NOT EXISTS statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_stakers integer DEFAULT 0,
  total_value_locked numeric DEFAULT 0,
  current_apy numeric DEFAULT 0,
  active_ads integer DEFAULT 0,
  total_revenue numeric DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view statistics"
  ON statistics
  FOR SELECT
  TO authenticated
  USING (true);

-- Function to update statistics
CREATE OR REPLACE FUNCTION update_statistics()
RETURNS trigger AS $$
BEGIN
  -- Update statistics based on current data
  UPDATE statistics
  SET
    total_stakers = (SELECT COUNT(DISTINCT user_id) FROM staking_positions),
    total_value_locked = (SELECT COALESCE(SUM(amount), 0) FROM staking_positions),
    active_ads = (SELECT COUNT(*) FROM advertisements WHERE status = 'active'),
    updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers to update statistics
CREATE TRIGGER update_stats_on_staking
  AFTER INSERT OR UPDATE OR DELETE ON staking_positions
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_statistics();

CREATE TRIGGER update_stats_on_ads
  AFTER INSERT OR UPDATE OR DELETE ON advertisements
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_statistics();

-- Insert initial statistics record
INSERT INTO statistics (id) VALUES (gen_random_uuid());