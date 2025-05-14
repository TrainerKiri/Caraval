import React from 'react';
import { Memory } from '../types';
import { useMemories } from '../contexts/MemoriesContext';
import { Calendar, Tag as TagIcon, X, Edit, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface MemoryDetailProps {
  memory: Memory;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
  isAdmin: boolean;
}

function MemoryDetail({ memory, onClose, onEdit, onDelete, isAdmin }: MemoryDetailProps) {
  const { tags } = useMemories();
  
  const memoryTags = tags.filter(tag => memory.tags?.includes(tag.id));

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-deep-blue/95 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="h-96 relative">
          <img 
            src={memory.image_url} 
            alt={memory.title}
            className="w-full h-full object-cover object-center"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6">
            <h2 className="text-2xl sm:text-3xl font-serif text-gold">{memory.title}</h2>
            <div className="flex items-center text-soft-white/90 mt-2">
              <Calendar size={16} className="mr-1" />
              <span>{format(new Date(memory.date), "d 'de' MMMM, yyyy", { locale: ptBR })}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-soft-white/90 whitespace-pre-line mb-6">{memory.description}</p>
          
          {memory.youtube_url && (
            <div className="mb-6">
              <iframe
                width="100%"
                height="315"
                src={memory.youtube_url.replace('watch?v=', 'embed/')}
                title="YouTube video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
          )}
          
          {memoryTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {memoryTags.map(tag => (
                <span 
                  key={tag.id}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm"
                  style={{ backgroundColor: `${tag.color}20`, color: tag.color }}
                >
                  <TagIcon size={14} className="mr-1" />
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          
          {isAdmin && (
            <div className="flex justify-end gap-3 border-t border-light-deep-blue/30 pt-4">
              <button 
                onClick={onEdit}
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gold/20 text-gold border border-gold/50 rounded-md hover:bg-gold/30 transition-colors"
              >
                <Edit size={16} className="mr-1" />
                Editar
              </button>
              <button 
                onClick={() => {
                  if (window.confirm('Tem certeza que deseja excluir esta memória? Esta ação não pode ser desfeita.')) {
                    onDelete();
                  }
                }}
                className="inline-flex items-center px-4 py-2 text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/50 rounded-md hover:bg-red-500/30 transition-colors"
              >
                <Trash2 size={16} className="mr-1" />
                Excluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MemoryDetail;