import React, { useState, useEffect } from 'react';
import { Memory } from '../types';
import { useMemories } from '../contexts/MemoriesContext';
import { X, Calendar, Image, Tag as TagIcon, Plus, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface MemoryFormProps {
  onClose: () => void;
  editMemory?: Memory;
}

function MemoryForm({ onClose, editMemory }: MemoryFormProps) {
  const { addMemory, updateMemory, tags } = useMemories();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isVisible, setIsVisible] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState('');

  useEffect(() => {
    setIsVisible(true);
    
    if (editMemory) {
      setTitle(editMemory.title);
      setDescription(editMemory.description);
      setDate(editMemory.date);
      setImagePreview(editMemory.image_url);
      setSelectedTags(editMemory.tags || []);
      setYoutubeUrl(editMemory.youtube_url || '');
    } else {
      const today = new Date().toISOString().split('T')[0];
      setDate(today);
    }
  }, [editMemory]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) newErrors.title = 'Título é obrigatório';
    if (!description.trim()) newErrors.description = 'Descrição é obrigatória';
    if (!date) newErrors.date = 'Data é obrigatória';
    if (!imageFile && !imagePreview) newErrors.image = 'Imagem é obrigatória';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('memory-images')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('memory-images')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setUploading(true);
      let finalImageUrl = imagePreview;

      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }
      
      const memoryData = {
        title,
        description,
        date,
        image_url: finalImageUrl,
        youtube_url: youtubeUrl || null,
        tags: selectedTags,
      };
      
      if (editMemory) {
        await updateMemory(editMemory.id, memoryData);
      } else {
        await addMemory(memoryData);
      }
      
      onClose();
    } catch (error) {
      console.error('Error handling memory:', error);
    } finally {
      setUploading(false);
    }
  };

  const toggleTag = (tagId: string) => {
    if (selectedTags.includes(tagId)) {
      setSelectedTags(selectedTags.filter(id => id !== tagId));
    } else {
      setSelectedTags([...selectedTags, tagId]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div 
        className={`bg-deep-blue rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto transition-all duration-500 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        <div className="flex items-center justify-between p-5 border-b border-light-deep-blue/30">
          <h2 className="text-xl font-serif text-gold">
            {editMemory ? 'Editar Memória' : 'Nova Memória'}
          </h2>
          <button 
            onClick={onClose}
            className="text-soft-white/70 hover:text-soft-white"
          >
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-5">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-soft-white/90 mb-1">
                Título
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full p-2 rounded-md bg-light-deep-blue/30 border ${
                  errors.title ? 'border-red-500' : 'border-light-deep-blue/50'
                } text-soft-white focus:outline-none focus:ring-1 focus:ring-gold/50`}
              />
              {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <label htmlFor="date" className="block text-sm font-medium text-soft-white/90">
                  Data
                </label>
                <Calendar size={14} className="ml-1 text-soft-white/60" />
              </div>
              <input
                type="date"
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`w-full p-2 rounded-md bg-light-deep-blue/30 border ${
                  errors.date ? 'border-red-500' : 'border-light-deep-blue/50'
                } text-soft-white focus:outline-none focus:ring-1 focus:ring-gold/50`}
              />
              {errors.date && <p className="mt-1 text-sm text-red-400">{errors.date}</p>}
            </div>
            
            <div>
              <div className="flex items-center mb-1">
                <label htmlFor="image" className="block text-sm font-medium text-soft-white/90">
                  Imagem
                </label>
                <Image size={14} className="ml-1 text-soft-white/60" />
              </div>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className={`w-full p-2 rounded-md bg-light-deep-blue/30 border ${
                  errors.image ? 'border-red-500' : 'border-light-deep-blue/50'
                } text-soft-white focus:outline-none focus:ring-1 focus:ring-gold/50`}
              />
              {errors.image && <p className="mt-1 text-sm text-red-400">{errors.image}</p>}
              
              {imagePreview && (
                <div className="mt-2 relative h-32 rounded-md overflow-hidden">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
              )}
            </div>

            <div>
              <label htmlFor="youtube_url" className="block text-sm font-medium text-soft-white/90 mb-1">
                URL do YouTube (opcional)
              </label>
              <input
                type="url"
                id="youtube_url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full p-2 rounded-md bg-light-deep-blue/30 border border-light-deep-blue/50 text-soft-white focus:outline-none focus:ring-1 focus:ring-gold/50"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-soft-white/90 mb-1">
                Descrição
              </label>
              <textarea
                id="description"
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={`w-full p-2 rounded-md bg-light-deep-blue/30 border ${
                  errors.description ? 'border-red-500' : 'border-light-deep-blue/50'
                } text-soft-white focus:outline-none focus:ring-1 focus:ring-gold/50`}
              />
              {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <label className="block text-sm font-medium text-soft-white/90">
                  Tags
                </label>
                <TagIcon size={14} className="ml-1 text-soft-white/60" />
              </div>
              
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.id)}
                    className={`inline-flex items-center px-3 py-1 text-xs rounded-full transition-colors ${
                      selectedTags.includes(tag.id)
                        ? `bg-${tag.color}/20 text-${tag.color} border border-${tag.color}/50`
                        : 'bg-light-deep-blue/30 text-soft-white/70 border border-light-deep-blue/50 hover:bg-light-deep-blue/50'
                    }`}
                    style={selectedTags.includes(tag.id) ? { backgroundColor: `${tag.color}20`, color: tag.color, borderColor: `${tag.color}50` } : {}}
                  >
                    <TagIcon size={12} className="mr-1" />
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-light-deep-blue/30">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium bg-light-deep-blue/30 text-soft-white/90 rounded-md hover:bg-light-deep-blue/50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={uploading}
              className="inline-flex items-center px-4 py-2 text-sm font-medium bg-gold/20 text-gold border border-gold/50 rounded-md hover:bg-gold/30 transition-colors"
            >
              {uploading ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Plus size={16} className="mr-1" />
                  {editMemory ? 'Salvar Alterações' : 'Criar Memória'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MemoryForm;