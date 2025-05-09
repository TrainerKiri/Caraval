import React, { useState, useEffect } from 'react';
import { Heart, Star, ChevronUp } from 'lucide-react';

function Creditos() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">Epílogo</h2>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 md:p-10 border border-light-deep-blue/30 text-center relative mb-12">
            {/* Stars decoration */}
            <div className="absolute -top-4 -left-4 text-gold/40">
              <Star size={32} fill="currentColor" />
            </div>
            <div className="absolute -bottom-4 -right-4 text-gold/40">
              <Star size={32} fill="currentColor" />
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-serif text-gold mb-6">Uma Carta ao Futuro</h3>
              
              <div className="prose prose-invert max-w-none text-soft-white/90">
                <p className="mb-4 text-lg">
                  Querido leitor dessas memórias,
                </p>
                
                <p className="mb-4">
                  Se você chegou até aqui, provavelmente navegou por fragmentos do nosso passado, 
                  pelas histórias que escolhemos preservar como tesouros. Este site é mais que um 
                  repositório digital — é um jardim de momentos que florescem toda vez que voltamos a eles.
                </p>
                
                <p className="mb-4">
                  O tempo, esse misterioso tecelão de histórias, continua sua obra. E enquanto novas 
                  memórias são criadas, as antigas ganham novos significados, como estrelas que brilham 
                  diferente dependendo de onde as observamos.
                </p>
                
                <p className="mb-4">
                  Que estas páginas sirvam como lembrete de que a vida é feita de instantes, e que 
                  a verdadeira magia está em saber reconhecê-los e honrá-los enquanto os vivemos.
                </p>
                
                <p>
                  Com carinho e gratidão por cada momento compartilhado,
                </p>
                
                <p className="text-gold italic">
                  — O Poeta
                </p>
              </div>
            </div>
            
            <div className="pt-8 border-t border-light-deep-blue/30">
              <h4 className="text-lg font-serif text-gold mb-4">Agradecimentos Especiais</h4>
              
              <ul className="space-y-2 text-soft-white/80">
                <li>À musa, por inspirar cada verso e colorir cada página desta história</li>
                <li>Ao tempo, por nos ensinar o valor de cada segundo compartilhado</li>
                <li>Aos amigos e familiares, personagens essenciais nesta narrativa</li>
                <li>E a você, que caminha conosco através destas memórias</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2 text-gold mb-6">
              <Star size={16} fill="currentColor" />
              <Heart size={16} fill="currentColor" />
              <Star size={16} fill="currentColor" />
            </div>
            
            <button 
              onClick={scrollToTop}
              className="group inline-flex items-center justify-center p-3 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
              title="Voltar ao topo"
            >
              <ChevronUp size={20} className="group-hover:animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Creditos;