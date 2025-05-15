import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface Conversation {
  id: string;
  date: string;
  messages: Array<{
    person: string;
    text: string;
  }>;
}

interface Poem {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface Playlist {
  id: string;
  name: string;
  description: string;
  songs: Song[];
}

interface Song {
  id: string;
  playlist_id: string;
  title: string;
  artist: string;
  memory: string;
}

interface Letter {
  id: string;
  title: string;
  content: string;
  date: string;
}

interface TreasuresContextType {
  conversations: Conversation[];
  poems: Poem[];
  playlists: Playlist[];
  letters: Letter[];
  loading: boolean;
  error: string | null;
  addConversation: (conversation: Omit<Conversation, 'id'>) => Promise<void>;
  updateConversation: (id: string, conversation: Partial<Conversation>) => Promise<void>;
  deleteConversation: (id: string) => Promise<void>;
  addPoem: (poem: Omit<Poem, 'id'>) => Promise<void>;
  updatePoem: (id: string, poem: Partial<Poem>) => Promise<void>;
  deletePoem: (id: string) => Promise<void>;
  addPlaylist: (playlist: Omit<Playlist, 'id' | 'songs'>) => Promise<void>;
  updatePlaylist: (id: string, playlist: Partial<Omit<Playlist, 'songs'>>) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  addSong: (song: Omit<Song, 'id'>) => Promise<void>;
  updateSong: (id: string, song: Partial<Song>) => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  addLetter: (letter: Omit<Letter, 'id'>) => Promise<void>;
  updateLetter: (id: string, letter: Partial<Letter>) => Promise<void>;
  deleteLetter: (id: string) => Promise<void>;
  refreshTreasures: () => Promise<void>;
}

const TreasuresContext = createContext<TreasuresContextType | undefined>(undefined);

export function TreasuresProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [poems, setPoems] = useState<Poem[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTreasures = async () => {
    try {
      setLoading(true);
      setError(null);

      const [
        { data: conversationsData, error: conversationsError },
        { data: poemsData, error: poemsError },
        { data: playlistsData, error: playlistsError },
        { data: lettersData, error: lettersError }
      ] = await Promise.all([
        supabase.from('conversations').select('*').order('date', { ascending: false }),
        supabase.from('poems').select('*').order('date', { ascending: false }),
        supabase.from('playlists').select('*, songs(*)').order('created_at', { ascending: false }),
        supabase.from('letters').select('*').order('date', { ascending: false })
      ]);

      if (conversationsError) throw conversationsError;
      if (poemsError) throw poemsError;
      if (playlistsError) throw playlistsError;
      if (lettersError) throw lettersError;

      setConversations(conversationsData || []);
      setPoems(poemsData || []);
      setPlaylists(playlistsData || []);
      setLetters(lettersData || []);
    } catch (error) {
      console.error('Error fetching treasures:', error);
      setError('Failed to load treasures. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTreasures();
  }, []);

  const addConversation = async (conversation: Omit<Conversation, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .insert([conversation])
        .select()
        .single();

      if (error) throw error;
      setConversations(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding conversation:', error);
      throw error;
    }
  };

  const updateConversation = async (id: string, conversation: Partial<Conversation>) => {
    try {
      const { data, error } = await supabase
        .from('conversations')
        .update(conversation)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setConversations(prev => prev.map(c => c.id === id ? { ...c, ...data } : c));
    } catch (error) {
      console.error('Error updating conversation:', error);
      throw error;
    }
  };

  const deleteConversation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('conversations')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setConversations(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error deleting conversation:', error);
      throw error;
    }
  };

  const addPoem = async (poem: Omit<Poem, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .insert([poem])
        .select()
        .single();

      if (error) throw error;
      setPoems(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding poem:', error);
      throw error;
    }
  };

  const updatePoem = async (id: string, poem: Partial<Poem>) => {
    try {
      const { data, error } = await supabase
        .from('poems')
        .update(poem)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPoems(prev => prev.map(p => p.id === id ? { ...p, ...data } : p));
    } catch (error) {
      console.error('Error updating poem:', error);
      throw error;
    }
  };

  const deletePoem = async (id: string) => {
    try {
      const { error } = await supabase
        .from('poems')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPoems(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting poem:', error);
      throw error;
    }
  };

  const addPlaylist = async (playlist: Omit<Playlist, 'id' | 'songs'>) => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .insert([playlist])
        .select()
        .single();

      if (error) throw error;
      setPlaylists(prev => [{ ...data, songs: [] }, ...prev]);
    } catch (error) {
      console.error('Error adding playlist:', error);
      throw error;
    }
  };

  const updatePlaylist = async (id: string, playlist: Partial<Omit<Playlist, 'songs'>>) => {
    try {
      const { data, error } = await supabase
        .from('playlists')
        .update(playlist)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPlaylists(prev => prev.map(p => p.id === id ? { ...p, ...data, songs: p.songs } : p));
    } catch (error) {
      console.error('Error updating playlist:', error);
      throw error;
    }
  };

  const deletePlaylist = async (id: string) => {
    try {
      const { error } = await supabase
        .from('playlists')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPlaylists(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting playlist:', error);
      throw error;
    }
  };

  const addSong = async (song: Omit<Song, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .insert([song])
        .select()
        .single();

      if (error) throw error;
      setPlaylists(prev => prev.map(p => 
        p.id === song.playlist_id 
          ? { ...p, songs: [...p.songs, data] }
          : p
      ));
    } catch (error) {
      console.error('Error adding song:', error);
      throw error;
    }
  };

  const updateSong = async (id: string, song: Partial<Song>) => {
    try {
      const { data, error } = await supabase
        .from('songs')
        .update(song)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setPlaylists(prev => prev.map(p => ({
        ...p,
        songs: p.songs.map(s => s.id === id ? { ...s, ...data } : s)
      })));
    } catch (error) {
      console.error('Error updating song:', error);
      throw error;
    }
  };

  const deleteSong = async (id: string) => {
    try {
      const { error } = await supabase
        .from('songs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setPlaylists(prev => prev.map(p => ({
        ...p,
        songs: p.songs.filter(s => s.id !== id)
      })));
    } catch (error) {
      console.error('Error deleting song:', error);
      throw error;
    }
  };

  const addLetter = async (letter: Omit<Letter, 'id'>) => {
    try {
      const { data, error } = await supabase
        .from('letters')
        .insert([letter])
        .select()
        .single();

      if (error) throw error;
      setLetters(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error adding letter:', error);
      throw error;
    }
  };

  const updateLetter = async (id: string, letter: Partial<Letter>) => {
    try {
      const { data, error } = await supabase
        .from('letters')
        .update(letter)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setLetters(prev => prev.map(l => l.id === id ? { ...l, ...data } : l));
    } catch (error) {
      console.error('Error updating letter:', error);
      throw error;
    }
  };

  const deleteLetter = async (id: string) => {
    try {
      const { error } = await supabase
        .from('letters')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setLetters(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting letter:', error);
      throw error;
    }
  };

  const refreshTreasures = async () => {
    await fetchTreasures();
  };

  return (
    <TreasuresContext.Provider value={{
      conversations,
      poems,
      playlists,
      letters,
      loading,
      error,
      addConversation,
      updateConversation,
      deleteConversation,
      addPoem,
      updatePoem,
      deletePoem,
      addPlaylist,
      updatePlaylist,
      deletePlaylist,
      addSong,
      updateSong,
      deleteSong,
      addLetter,
      updateLetter,
      deleteLetter,
      refreshTreasures,
    }}>
      {children}
    </TreasuresContext.Provider>
  );
}

export function useTreasures() {
  const context = useContext(TreasuresContext);
  if (context === undefined) {
    throw new Error('useTreasures must be used within a TreasuresProvider');
  }
  return context;
}