import React, { useEffect, useState } from 'react';
import { Book, Heart, Sparkles } from 'lucide-react';

function OPoeta() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">O Poeta</h2>
            <div className="flex justify-center">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-xl border border-light-deep-blue/20">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-deep-blue/80"></div>
                  <img 
                    src="https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="O Poeta" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex justify-center gap-4 text-gold mt-2">
                  <Book size={20} />
                  <Heart size={20} />
                  <Sparkles size={20} />
                </div>
              </div>
              
              <div className="md:w-2/3">
                <h3 className="text-xl font-serif text-gold mb-4">Sobre o Criador</h3>
                
                <div className="prose prose-invert text-soft-white/90 max-w-none">
                  <p className="mb-4">Aqui entre palavras e silêncios, entre luzes e estrelas, sou apenas alguém que tenta capturar o infinito em algumas linhas. O tempo é como areia entre os dedos, e estas memórias são minha tentativa de guardar alguns grãos.</p>
                  
                  <p className="mb-4">Colecionador de momentos, observador de sorrisos. Acredito que cada instante compartilhado carrega uma magia própria, e através destas páginas, tento eternizar o que o tempo insiste em levar.</p>
                  
                  <blockquote className="border-l-2 border-gold/50 pl-4 italic my-6">
                    "Somos feitos da mesma substância dos sonhos, e nossa pequena vida está cercada de sono."
                    <footer className="text-gold/70 not-italic text-sm mt-1">— William Shakespeare</footer>
                  </blockquote>
                  
                  <p>Este espaço é um convite para uma jornada através das minhas memórias mais preciosas, momentos capturados entre o real e o sonhado, entre o vivido e o imaginado.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPoeta;