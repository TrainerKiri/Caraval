export interface Memory {
  id: string;
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  tags: string[];
}

export interface Tag {
  id: string;
  name: string;
  color: string;
}