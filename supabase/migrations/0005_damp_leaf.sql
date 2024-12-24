/*
  # Telegram Bot Schema

  1. New Tables
    - `bot_messages`
      - Stores message history and analytics
    - `bot_commands`
      - Tracks command usage statistics
  
  2. Security
    - Enable RLS on new tables
    - Add policies for service role access
*/

-- Bot messages table
CREATE TABLE IF NOT EXISTS bot_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_user_id text NOT NULL,
  message_text text,
  command text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bot_messages ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Service role can manage bot_messages"
  ON bot_messages
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Bot commands table
CREATE TABLE IF NOT EXISTS bot_commands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  command text NOT NULL,
  usage_count integer DEFAULT 0,
  last_used_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE bot_commands ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Service role can manage bot_commands"
  ON bot_commands
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Insert default commands
INSERT INTO bot_commands (command, usage_count)
VALUES 
  ('/start', 0),
  ('/price', 0),
  ('/stats', 0),
  ('/help', 0)
ON CONFLICT DO NOTHING;