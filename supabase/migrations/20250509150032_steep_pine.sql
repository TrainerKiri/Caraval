/*
  # Create storage bucket for memory images
  
  1. New Storage Bucket
    - Create a new storage bucket called 'memory-images'
    - Enable public access for memory images
*/

-- Create a new storage bucket for memory images
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