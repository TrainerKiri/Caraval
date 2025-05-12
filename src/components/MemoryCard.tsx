import React from 'react';
import { Memory } from '../types';
import { useMemories } from '../contexts/MemoriesContext';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Sparkles, Moon, Star } from 'lucide-react';

interface MemoryCardProps {
  memory: Memory;
  onClick: () => void;
}

function MemoryCard({ memory, onClick }: MemoryCardProps) {
  const { tags } = useMemories();
  
  const memoryTags = tags.filter(tag => memory.tags?.includes(tag.id));
  
  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer perspective-1000"
    >
      <div className="mystical-card transform-gpu transition-all duration-500 group-hover:rotate-y-6 group-hover:scale-105">
        {/* Card Frame */}
        <div className="relative h-[450px] w-[300px] overflow-hidden rounded-2xl border border-mystical-gold/30 bg-gradient-to-br from-deep-blue via-caraval-purple to-caraval-blue">
          {/* Magical Border */}
          <div className="absolute inset-0 bg-card-texture opacity-10"></div>
          <div className="absolute inset-[2px] rounded-2xl overflow-hidden">
            {/* Image Container */}
            <div className="relative h-[250px]">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img 
                src={memory.image_url} 
                alt={memory.title}
                className="w-full h-full object-cover object-center"
              />
              {/* Magical Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-transparent to-transparent z-20"></div>
              
              {/* Floating Elements */}
              <Star className="absolute top-4 right-4 text-mystical-gold/70 animate-sparkle z-30" size={16} />
              <Moon className="absolute top-4 left-4 text-mystical-gold/70 animate-sparkle delay-100 z-30" size={16} />
              <Sparkles className="absolute bottom-4 right-4 text-mystical-gold/70 animate-sparkle delay-200 z-30" size={16} />
            </div>

            {/* Content */}
            <div className="p-6 relative">
              {/* Title */}
              <h3 className="font-mystical text-xl text-mystical-gold mb-2 leading-tight">
                {memory.title}
              </h3>

              {/* Date */}
              <p className="text-soft-white/70 text-sm mb-3 font-mystical italic">
                {format(new Date(memory.date), "d 'de' MMMM, yyyy", { locale: ptBR })}
              </p>

              {/* Description */}
              <p className="text-soft-white/90 text-sm line-clamp-3 mb-4">
                {memory.description}
              </p>

              {/* Tags */}
              {memoryTags && memoryTags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-auto">
                  {memoryTags.map(tag => (
                    <span 
                      key={tag.id}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs"
                      style={{ 
                        backgroundColor: `${tag.color}20`,
                        color: tag.color,
                        borderColor: `${tag.color}40`,
                        border: '1px solid'
                      }}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Magical Corner Decorations */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-mystical-gold/30"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-mystical-gold/30"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-mystical-gold/30"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-mystical-gold/30"></div>
        </div>
      </div>
    </div>
  );
}

export default MemoryCard;