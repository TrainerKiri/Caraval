import React, { useState, useEffect } from 'react';
import { MessageSquare, Bookmark, Music, FileText, Sparkles, Loader, Plus, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTreasures } from '../contexts/TreasuresContext';

function Tesouros() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('conversas');
  const { isAdmin } = useAuth();
  const { loading, error, refreshTreasures } = useTreasures();
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  const tabItems = [
    { id: 'conversas', label: 'Conversas', icon: <MessageSquare size={16} /> },
    { id: 'poemas', label: 'Poemas', icon: <Bookmark size={16} /> },
    { id: 'musicas', label: 'Músicas', icon: <Music size={16} /> },
    { id: 'cartas', label: 'Cartas', icon: <FileText size={16} /> },
  ];

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 text-gold animate-spin mx-auto mb-4" />
          <p className="text-soft-white/70">Carregando tesouros...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 mb-4">⚠️</div>
          <p className="text-red-400 mb-2">{error}</p>
          <button 
            onClick={refreshTreasures}
            className="text-gold hover:text-gold/80 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'conversas':
        return <ConversasTab isAdmin={isAdmin} />;
      case 'poemas':
        return <PoemasTab isAdmin={isAdmin} />;
      case 'musicas':
        return <MusicasTab isAdmin={isAdmin} />;
      case 'cartas':
        return <CartasTab isAdmin={isAdmin} />;
      default:
        return <ConversasTab isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">Tesouros</h2>
            <p className="text-soft-white/80 max-w-xl mx-auto">
              Pequenas preciosidades coletadas ao longo do caminho
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg border border-light-deep-blue/30 overflow-hidden">
            <div className="flex flex-wrap border-b border-light-deep-blue/30">
              {tabItems.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-gold bg-light-deep-blue/40 border-b-2 border-gold'
                      : 'text-soft-white/70 hover:text-soft-white hover:bg-light-deep-blue/30'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversasTab({ isAdmin }: { isAdmin: boolean }) {
  const { conversations, addConversation, updateConversation, deleteConversation } = useTreasures();
  const [showForm, setShowForm] = useState(false);
  const [editingConversation, setEditingConversation] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta conversa?')) {
      try {
        await deleteConversation(id);
      } catch (error) {
        console.error('Error deleting conversation:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Conversas Preciosas</h3>
        {isAdmin && (
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Adicionar Conversa
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {conversations.map((convo) => (
          <div key={convo.id} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-soft-white/60 text-sm">{convo.date}</span>
              {isAdmin && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingConversation(convo.id)}
                    className="text-soft-white/60 hover:text-soft-white transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(convo.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {convo.messages.map((msg, msgIndex) => (
                <div 
                  key={msgIndex} 
                  className={`flex ${msg.person === 'Eu' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.person === 'Eu' 
                        ? 'bg-gold/20 text-soft-white' 
                        : 'bg-light-deep-blue/40 text-soft-white/90'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">
                      {msg.person}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PoemasTab({ isAdmin }: { isAdmin: boolean }) {
  const { poems, addPoem, updatePoem, deletePoem } = useTreasures();
  const [showForm, setShowForm] = useState(false);
  const [editingPoem, setEditingPoem] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este poema?')) {
      try {
        await deletePoem(id);
      } catch (error) {
        console.error('Error deleting poem:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Poemas & Escritos</h3>
        {isAdmin && (
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Adicionar Poema
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {poems.map((poem) => (
          <div key={poem.id} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-serif text-gold">{poem.title}</h4>
              {isAdmin && (
                <div className="flex gap-2">
                  <button 
                    onClick={() => setEditingPoem(poem.id)}
                    className="text-soft-white/60 hover:text-soft-white transition-colors"
                  >
                    <Edit size={16} />
                  </button>
                  <button 
                    onClick={() => handleDelete(poem.id)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
            <div className="whitespace-pre-line text-soft-white/90 italic mb-4">
              {poem.content}
            </div>
            <div className="text-right">
              <span className="text-soft-white/60 text-sm">{poem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicasTab({ isAdmin }: { isAdmin: boolean }) {
  const { playlists, addPlaylist, updatePlaylist, deletePlaylist, addSong, updateSong, deleteSong } = useTreasures();
  const [showPlaylistForm, setShowPlaylistForm] = useState(false);
  const [editingPlaylist, setEditingPlaylist] = useState<string | null>(null);
  const [showSongForm, setShowSongForm] = useState(false);
  const [editingSong, setEditingSong] = useState<string | null>(null);

  const handleDeletePlaylist = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta playlist?')) {
      try {
        await deletePlaylist(id);
      } catch (error) {
        console.error('Error deleting playlist:', error);
      }
    }
  };

  const handleDeleteSong = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta música?')) {
      try {
        await deleteSong(id);
      } catch (error) {
        console.error('Error deleting song:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Nossas Melodias</h3>
        {isAdmin && (
          <button 
            onClick={() => setShowPlaylistForm(true)}
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Adicionar Playlist
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {playlists.map((playlist) => (
          <div key={playlist.id} className="bg-deep-blue/50 rounded-lg overflow-hidden border border-light-deep-blue/30">
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-serif text-gold mb-1">{playlist.name}</h4>
                  <p className="text-soft-white/70 text-sm">{playlist.description}</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingPlaylist(playlist.id)}
                      className="text-soft-white/60 hover:text-soft-white transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
              
              {isAdmin && (
                <button 
                  onClick={() => setShowSongForm(true)}
                  className="mt-4 text-gold hover:text-gold/80 transition-colors text-sm"
                >
                  <Plus size={14} className="inline mr-1" />
                  Adicionar Música
                </button>
              )}
            </div>
            
            <div className="border-t border-light-deep-blue/30">
              {playlist.songs.map((song) => (
                <div 
                  key={song.id}
                  className="flex items-center justify-between p-4 hover:bg-light-deep-blue/10"
                >
                  <div className="flex-1">
                    <div className="font-medium text-soft-white">{song.title}</div>
                    <div className="text-soft-white/60 text-sm">{song.artist}</div>
                    <div className="mt-1 text-soft-white/70 text-sm italic">
                      "{song.memory}"
                    </div>
                  </div>
                  
                  {isAdmin && (
                    <div className="flex gap-2 ml-4">
                      <button 
                        onClick={() => setEditingSong(song.id)}
                        className="text-soft-white/60 hover:text-soft-white transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteSong(song.id)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartasTab({ isAdmin }: { isAdmin: boolean }) {
  const { letters, addLetter, updateLetter, deleteLetter } = useTreasures();
  const [showForm, setShowForm] = useState(false);
  const [editingLetter, setEditingLetter] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta carta?')) {
      try {
        await deleteLetter(id);
      } catch (error) {
        console.error('Error deleting letter:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Cartas & Bilhetes</h3>
        {isAdmin && (
          <button 
            onClick={() => setShowForm(true)}
            className="inline-flex items-center text-gold hover:text-gold/80 transition-colors"
          >
            <Plus size={16} className="mr-1" />
            Adicionar Carta
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {letters.map((letter) => (
          <div key={letter.id} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-serif text-gold">{letter.title}</h4>
              <div className="flex items-center gap-4">
                <span className="text-soft-white/60 text-sm">{letter.date}</span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setEditingLetter(letter.id)}
                      className="text-soft-white/60 hover:text-soft-white transition-colors"
                    >
                      <Edit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(letter.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 right-0">
                <Sparkles size={16} className="text-gold/50" />
              </div>
              
              <div className="bg-light-deep-blue/20 rounded p-4 font-serif whitespace-pre-line text-soft-white/90 italic">
                {letter.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tesouros;