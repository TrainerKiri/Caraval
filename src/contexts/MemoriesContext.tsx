import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Memory, Tag } from '../types';

interface MemoriesContextType {
  memories: Memory[];
  tags: Tag[];
  addMemory: (memory: Omit<Memory, 'id'>) => Promise<void>;
  updateMemory: (id: string, memory: Partial<Memory>) => Promise<void>;
  deleteMemory: (id: string) => Promise<void>;
  addTag: (name: string, color: string) => Promise<void>;
  updateTag: (id: string, tag: Partial<Tag>) => Promise<void>;
  deleteTag: (id: string) => Promise<void>;
  filteredMemories: Memory[];
  setFilterTags: (tagIds: string[]) => void;
  filterTags: string[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  loading: boolean;
}

const MemoriesContext = createContext<MemoriesContextType | undefined>(undefined);

export function MemoriesProvider({ children }: { children: ReactNode }) {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMemories();
    fetchTags();
  }, []);

  async function fetchMemories() {
    try {
      const { data, error } = await supabase
        .from('memories')
        .select('*, memory_images(url)')
        .order('date', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Memory type
      const transformedMemories = data.map(memory => ({
        ...memory,
        imageUrl: memory.memory_images?.[0]?.url || memory.image_url // Use first image from memory_images or fallback to image_url
      }));

      setMemories(transformedMemories || []);
    } catch (error) {
      console.error('Error fetching memories:', error);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTags() {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');

      if (error) throw error;
      setTags(data || []);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }

  const addMemory = async (memory: Omit<Memory, 'id'>) => {
    try {
      // First, insert the memory
      const { data: memoryData, error: memoryError } = await supabase
        .from('memories')
        .insert([{
          title: memory.title,
          description: memory.description,
          date: memory.date,
          image_url: memory.imageUrl, // Store in the original column as backup
          tags: memory.tags
        }])
        .select()
        .single();

      if (memoryError) throw memoryError;

      // Then, add the image to memory_images
      if (memory.imageUrl) {
        const { error: imageError } = await supabase
          .from('memory_images')
          .insert([{
            memory_id: memoryData.id,
            url: memory.imageUrl,
          }]);

        if (imageError) throw imageError;
      }

      // Update the local state with the new memory
      const newMemory = {
        ...memoryData,
        imageUrl: memory.imageUrl
      };
      
      setMemories(prev => [newMemory, ...prev]);
    } catch (error) {
      console.error('Error adding memory:', error);
    }
  };

  const updateMemory = async (id: string, memory: Partial<Memory>) => {
    try {
      // Update the main memory record
      const { data: memoryData, error: memoryError } = await supabase
        .from('memories')
        .update({
          title: memory.title,
          description: memory.description,
          date: memory.date,
          image_url: memory.imageUrl, // Update backup image
          tags: memory.tags
        })
        .eq('id', id)
        .select()
        .single();

      if (memoryError) throw memoryError;

      // Update or insert the image in memory_images
      if (memory.imageUrl) {
        const { error: imageError } = await supabase
          .from('memory_images')
          .upsert([{
            memory_id: id,
            url: memory.imageUrl,
          }]);

        if (imageError) throw imageError;
      }

      // Update local state
      setMemories(prev => prev.map(m => m.id === id ? { ...m, ...memory } : m));
    } catch (error) {
      console.error('Error updating memory:', error);
    }
  };

  const deleteMemory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('memories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setMemories(prev => prev.filter(memory => memory.id !== id));
    } catch (error) {
      console.error('Error deleting memory:', error);
    }
  };

  const addTag = async (name: string, color: string) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .insert([{ name, color }])
        .select()
        .single();

      if (error) throw error;
      setTags(prev => [...prev, data]);
    } catch (error) {
      console.error('Error adding tag:', error);
    }
  };

  const updateTag = async (id: string, tag: Partial<Tag>) => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .update(tag)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setTags(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));
    } catch (error) {
      console.error('Error updating tag:', error);
    }
  };

  const deleteTag = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTags(prev => prev.filter(tag => tag.id !== id));
      setMemories(prev =>
        prev.map(memory => ({
          ...memory,
          tags: memory.tags.filter(tagId => tagId !== id),
        }))
      );
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const filteredMemories = memories
    .filter((memory) => {
      if (filterTags.length === 0) return true;
      return memory.tags.some((tag) => filterTags.includes(tag));
    })
    .filter((memory) => {
      if (!searchQuery) return true;
      const query = searchQuery.toLowerCase();
      return (
        memory.title.toLowerCase().includes(query) ||
        memory.description.toLowerCase().includes(query)
      );
    });

  return (
    <MemoriesContext.Provider
      value={{
        memories,
        tags,
        addMemory,
        updateMemory,
        deleteMemory,
        addTag,
        updateTag,
        deleteTag,
        filteredMemories,
        filterTags,
        setFilterTags,
        searchQuery,
        setSearchQuery,
        loading
      }}
    >
      {children}
    </MemoriesContext.Provider>
  );
}

export function useMemories() {
  const context = useContext(MemoriesContext);
  if (context === undefined) {
    throw new Error('useMemories must be used within a MemoriesProvider');
  }
  return context;
}