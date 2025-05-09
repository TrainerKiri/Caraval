import { Memory, Tag } from '../types';

export const INITIAL_TAGS: Tag[] = [
  { id: '1', name: 'Family', color: '#F59E0B' },
  { id: '2', name: 'Travel', color: '#60A5FA' },
  { id: '3', name: 'Celebration', color: '#EC4899' },
  { id: '4', name: 'Food', color: '#84CC16' },
  { id: '5', name: 'Nature', color: '#10B981' },
];

export const INITIAL_MEMORIES: Memory[] = [
  {
    id: '1',
    title: 'Beach Vacation in Malibu',
    description: 'We spent a wonderful week at the beach. The sunsets were breathtaking and we had so much fun building sandcastles and swimming in the ocean.',
    date: '2023-07-15',
    imageUrl: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['2', '5'],
  },
  {
    id: '2',
    title: 'Grandma\'s Birthday Party',
    description: 'We celebrated Grandma\'s 80th birthday with the whole family. Everyone brought their specialty dishes and we surprised her with a photo album of memories through the years.',
    date: '2023-05-22',
    imageUrl: 'https://images.pexels.com/photos/2072181/pexels-photo-2072181.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['1', '3', '4'],
  },
  {
    id: '3',
    title: 'Hiking in the Mountains',
    description: 'We went for a beautiful hike in the mountains. The views were amazing and we saw so many different types of plants and animals along the way.',
    date: '2023-09-10',
    imageUrl: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['2', '5'],
  },
  {
    id: '4',
    title: 'Christmas Dinner',
    description: 'Our family Christmas dinner was magical this year. We had all the traditional dishes and exchanged gifts by the fire. The kids were so excited!',
    date: '2022-12-25',
    imageUrl: 'https://images.pexels.com/photos/1741307/pexels-photo-1741307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['1', '3', '4'],
  },
  {
    id: '5',
    title: 'First Day of School',
    description: 'Emma\'s first day of high school. She was so nervous but excited at the same time. I can\'t believe how fast she\'s growing up!',
    date: '2023-08-28',
    imageUrl: 'https://images.pexels.com/photos/5088188/pexels-photo-5088188.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    tags: ['1'],
  },
];