import React from 'react';
import { Memory } from '../types';
import { useMemories } from '../contexts/MemoriesContext';
import { Calendar, Tag as TagIcon, X, Edit, Trash2 } from 'lucide-react';

interface MemoryDetailProps {
  memory: Memory;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function MemoryDetail({ memory, onClose, onEdit, onDelete }: MemoryDetailProps) {
  const { tags } = useMemories();
  
  // Format the date to be more readable
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get the tag objects for this memory
  const memoryTags = tags.filter(tag => memory.tags.includes(tag.id));

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden animate-fadeIn">
        <div className="h-96 relative">
          <img 
            src={memory.imageUrl} 
            alt={memory.title}
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent py-4 px-6">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{memory.title}</h2>
            <div className="flex items-center text-white/90 mt-2">
              <Calendar size={16} className="mr-1" />
              <span>{formatDate(memory.date)}</span>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <p className="text-gray-700 whitespace-pre-line mb-6">{memory.description}</p>
          
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
          
          <div className="flex justify-end gap-3 border-t pt-4">
            <button 
              onClick={onEdit}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors"
            >
              <Edit size={16} className="mr-1" />
              Edit
            </button>
            <button 
              onClick={onDelete}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemoryDetail;