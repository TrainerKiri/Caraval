import React, { useState, useEffect } from 'react';
import { useMemories } from '../contexts/MemoriesContext';
import MemoryCard from '../components/MemoryCard';
import MemoryDetail from '../components/MemoryDetail';
import MemoryForm from '../components/MemoryForm';
import { Search, Tag as TagIcon, Plus, Filter, Sparkles, Loader } from 'lucide-react';
import { Memory } from '../types';

function MemoriasGaleria() {
  const { 
    filteredMemories, 
    tags, 
    setFilterTags, 
    filterTags, 
    searchQuery, 
    setSearchQuery,
    deleteMemory,
    loading 
  } = useMemories();
  
  const [selectedMemory, setSelectedMemory] = useState<Memory | null>(null);
  const [showMemoryForm, setShowMemoryForm] = useState(false);
  const [editingMemory, setEditingMemory] = useState<Memory | undefined>(undefined);
  const [showFilter, setShowFilter] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleTagToggle = (tagId: string) => {
    setFilterTags(filterTags.includes(tagId) 
      ? filterTags.filter(id => id !== tagId)
      : [...filterTags, tagId]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-mystical-gold animate-spin mx-auto mb-4" />
          <p className="text-soft-white/70 font-mystical">Desvendando memórias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-mystical text-mystical-gold mb-4 flex items-center justify-center">
              <Sparkles className="w-6 h-6 mr-3 animate-sparkle" />
              Memórias Encantadas
              <Sparkles className="w-6 h-6 ml-3 animate-sparkle delay-100" />
            </h2>
            <p className="text-soft-white/80 max-w-xl mx-auto font-mystical italic">
              Cada carta guarda um fragmento mágico de nossa história
            </p>
            <div className="flex justify-center mt-4">
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-mystical-gold/50 to-transparent"></div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
            <div className="w-full md:w-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-mystical-gold/50" size={18} />
                <input
                  type="text"
                  placeholder="Buscar nas memórias..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full md:w-72 pl-12 pr-4 py-3 rounded-full bg-deep-blue/50 border border-mystical-gold/30 text-soft-white placeholder-soft-white/50 focus:outline-none focus:ring-2 focus:ring-mystical-gold/50 transition-all"
                />
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                onClick={() => setShowFilter(!showFilter)}
                className="inline-flex items-center px-6 py-3 rounded-full bg-deep-blue/50 border border-mystical-gold/30 text-soft-white hover:bg-caraval-purple/20 transition-all group"
              >
                <Filter size={18} className="mr-2 text-mystical-gold group-hover:rotate-180 transition-transform duration-500" />
                Filtrar
              </button>
              
              <button
                onClick={() => {
                  setEditingMemory(undefined);
                  setShowMemoryForm(true);
                }}
                className="inline-flex items-center px-6 py-3 rounded-full bg-mystical-gold/20 border border-mystical-gold text-mystical-gold hover:bg-mystical-gold/30 transition-all group"
              >
                <Plus size={18} className="mr-2 group-hover:rotate-90 transition-transform duration-500" />
                Nova Memória
              </button>
            </div>
          </div>
          
          {showFilter && (
            <div className="mb-12 p-6 bg-deep-blue/30 rounded-2xl border border-mystical-gold/30 animate-fadeIn backdrop-blur-sm">
              <h3 className="text-lg font-mystical text-mystical-gold mb-4 flex items-center">
                <TagIcon size={18} className="mr-2" />
                Filtrar por categoria
              </h3>
              <div className="flex flex-wrap gap-3">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    onClick={() => handleTagToggle(tag.id)}
                    className={`inline-flex items-center px-4 py-2 rounded-full text-sm transition-all ${
                      filterTags.includes(tag.id)
                        ? 'bg-mystical-gold/20 text-mystical-gold border-mystical-gold'
                        : 'bg-deep-blue/50 text-soft-white/70 hover:text-soft-white hover:bg-deep-blue/70'
                    } border`}
                  >
                    <TagIcon size={14} className="mr-2" />
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {filteredMemories.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-soft-white/60 font-mystical italic text-lg">
                Nenhuma memória encontrada neste capítulo da história...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
              {filteredMemories.map(memory => (
                <MemoryCard 
                  key={memory.id} 
                  memory={memory} 
                  onClick={() => setSelectedMemory(memory)} 
                />
              ))}
            </div>
          )}
        </div>
      </div>
      
      {selectedMemory && (
        <MemoryDetail 
          memory={selectedMemory} 
          onClose={() => setSelectedMemory(null)}
          onEdit={() => {
            setEditingMemory(selectedMemory);
            setShowMemoryForm(true);
            setSelectedMemory(null);
          }}
          onDelete={() => {
            deleteMemory(selectedMemory.id);
            setSelectedMemory(null);
          }}
        />
      )}
      
      {showMemoryForm && (
        <MemoryForm 
          onClose={() => setShowMemoryForm(false)} 
          editMemory={editingMemory}
        />
      )}
    </div>
  );
}

export default MemoriasGaleria;