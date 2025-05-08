import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

interface EntradaProps {
  onExplore: () => void;
}

function Entrada({ onExplore }: EntradaProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const welcomeTexts = [
    "Bem-vindo ao lugar onde memórias viram versos...",
    "Um jardim de momentos suspensos no tempo...",
    "Entre neste mundo onde cada momento é eterno..."
  ];
  
  useEffect(() => {
    setIsVisible(true);
    
    const textInterval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % welcomeTexts.length);
    }, 4000);
    
    return () => clearInterval(textInterval);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center text-center px-4">
      {/* Background with subtle star effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="stars-container absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-light-deep-blue via-deep-blue to-deep-blue"></div>
      </div>
      
      {/* Content */}
      <div className={`relative max-w-3xl mx-auto transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-gold mb-6">
          Memórias Encantadas
        </h1>
        
        <div className="h-16 md:h-20 mb-8 relative">
          {welcomeTexts.map((text, index) => (
            <p 
              key={index}
              className={`absolute inset-0 text-xl md:text-2xl font-serif italic text-soft-white/90 transition-all duration-1000 ${
                currentTextIndex === index 
                  ? 'opacity-100 transform-none' 
                  : 'opacity-0 translate-y-4'
              }`}
            >
              {text}
            </p>
          ))}
        </div>
        
        <button 
          onClick={onExplore}
          className="group relative inline-flex items-center justify-center px-8 py-4 mt-6 overflow-hidden font-medium rounded-full transition-all duration-300 ease-out bg-transparent border-2 border-gold text-gold hover:text-deep-blue"
        >
          <span className="absolute inset-0 w-full h-full -translate-x-full transform bg-gold transition-all duration-300 ease-out group-hover:translate-x-0"></span>
          <span className="relative flex items-center">
            Explorar memórias <ChevronRight size={18} className="ml-2 group-hover:animate-bounce-x" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Entrada;