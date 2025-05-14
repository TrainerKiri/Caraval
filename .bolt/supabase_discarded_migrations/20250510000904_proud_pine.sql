/*
  # Add tables for treasures and history sections

  1. New Tables
    - `conversations`
      - `id` (uuid, primary key)
      - `date` (date)
      - `messages` (jsonb array of messages)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `poems`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `date` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `playlists`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `songs`
      - `id` (uuid, primary key)
      - `playlist_id` (uuid, foreign key)
      - `title` (text)
      - `artist` (text)
      - `memory` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `letters`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `date` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `timeline_events`
      - `id` (uuid, primary key)
      - `date` (text)
      - `title` (text)
      - `description` (text)
      - `image_url` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for admin users to manage content
    - Add policies for public to view content
*/

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL,
  messages jsonb[] NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view conversations"
  ON conversations
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage conversations"
  ON conversations
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Poems table
CREATE TABLE IF NOT EXISTS poems (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE poems ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view poems"
  ON poems
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage poems"
  ON poems
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Playlists table
CREATE TABLE IF NOT EXISTS playlists (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view playlists"
  ON playlists
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage playlists"
  ON playlists
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Songs table
CREATE TABLE IF NOT EXISTS songs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  playlist_id uuid REFERENCES playlists(id) ON DELETE CASCADE,
  title text NOT NULL,
  artist text NOT NULL,
  memory text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE songs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view songs"
  ON songs
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage songs"
  ON songs
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Letters table
CREATE TABLE IF NOT EXISTS letters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE letters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view letters"
  ON letters
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage letters"
  ON letters
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Timeline events table
CREATE TABLE IF NOT EXISTS timeline_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE timeline_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view timeline_events"
  ON timeline_events
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage timeline_events"
  ON timeline_events
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Add update triggers for updated_at columns
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_conversations_updated_at
  BEFORE UPDATE ON conversations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_poems_updated_at
  BEFORE UPDATE ON poems
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_playlists_updated_at
  BEFORE UPDATE ON playlists
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_songs_updated_at
  BEFORE UPDATE ON songs
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_letters_updated_at
  BEFORE UPDATE ON letters
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_timeline_events_updated_at
  BEFORE UPDATE ON timeline_events
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();