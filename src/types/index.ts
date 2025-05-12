export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  image_url: string;
  user_id: string;
  created_at: string;
  youtube_url?: string;
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}