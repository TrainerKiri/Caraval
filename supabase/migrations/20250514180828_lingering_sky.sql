/*
  # Initial Schema Setup

  1. New Tables
    - `memories`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `date` (date)
      - `image_url` (text)
      - `youtube_url` (text, optional)
      - `user_id` (uuid, references auth.users)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
      - `tags` (text array)

    - `tags`
      - `id` (uuid, primary key)
      - `name` (text)
      - `color` (text)
      - `created_at` (timestamp)

    - `admin_users`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `created_at` (timestamp)

  2. Storage
    - Create 'memory-images' bucket for storing memory images
    - Enable public access for memory images

  3. Security
    - Enable RLS on all tables
    - Add policies for public viewing
    - Add policies for admin management
*/

-- Create storage bucket for memory images
INSERT INTO storage.buckets (id, name, public)
VALUES ('memory-images', 'memory-images', true);

-- Create policy to allow authenticated users to upload images
CREATE POLICY "Allow authenticated users to upload images"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'memory-images');

-- Create policy to allow public to view images
CREATE POLICY "Allow public to view images"
ON storage.objects FOR SELECT TO public
USING (bucket_id = 'memory-images');

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view tags"
  ON tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage tags"
  ON tags
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Create memories table
CREATE TABLE IF NOT EXISTS memories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  date date NOT NULL,
  image_url text NOT NULL,
  youtube_url text,
  user_id uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  tags text[] DEFAULT '{}'::text[]
);

ALTER TABLE memories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public to view memories"
  ON memories
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow admin to manage memories"
  ON memories
  USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Add update trigger for updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_memories_updated_at
  BEFORE UPDATE ON memories
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();