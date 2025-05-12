import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { Memory, Tag } from '../types';

interface MemoriesContextType {
  memories: Memory[];
  tags: Tag[];
  addMemory: (memory: Omit<Memory, 'id' | 'created_at' | 'user_id'>) => Promise<void>;
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
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .order('date', { ascending: false });

      if (error) throw error;

      setMemories(data || []);
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

  const addMemory = async (memory: Omit<Memory, 'id' | 'created_at' | 'user_id'>) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('memories')
        .insert([{
          ...memory,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      
      setMemories(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding memory:', error);
      throw error;
    }
  };

  const updateMemory = async (id: string, memory: Partial<Memory>) => {
    try {
      const { data, error } = await supabase
        .from('memories')
        .update(memory)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setMemories(prev => prev.map(m => m.id === id ? { ...m, ...data } : m));
    } catch (error) {
      console.error('Error updating memory:', error);
      throw error;
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
      throw error;
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
    } catch (error) {
      console.error('Error deleting tag:', error);
    }
  };

  const filteredMemories = memories
    .filter((memory) => {
      if (filterTags.length === 0) return true;
      return memory.tags?.some((tag) => filterTags.includes(tag));
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