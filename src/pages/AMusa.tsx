import React, { useEffect, useState } from 'react';
import { Star, Heart, Quote } from 'lucide-react';

function AMusa() {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  const quotes = [
    { quote: "Seus olhos guardam universos que ainda não explorei por completo.", author: "Do poeta para a Estrela" },
    { quote: "Existem pessoas que são poemas andantes; ela é toda uma biblioteca de versos.", author: "Do poeta para a Estrela" },
    { quote: "Às vezes me pergunto se as estrelas não são apenas reflexos do seu sorriso.", author: "Do poeta para a Estrela" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">A Musa</h2>
            <p className="text-soft-white/80 max-w-xl mx-auto">
              Aquela que inspira os versos mais profundos e guarda os sentimentos mais sinceros
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="relative mb-12">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-gold/50 via-light-deep-blue/50 to-gold/50 rounded-lg blur opacity-30"></div>
            <div className="relative bg-light-deep-blue/20 backdrop-blur-sm rounded-lg overflow-hidden">
              <div className="h-64 md:h-80 relative">
                <img 
                  src="" 
                  alt="A Estrela" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-serif text-gold font-bold">Ana</h3>
                  <p className="text-soft-white/90 italic mt-2">
                    "Aquela que transforma momentos em eternidade"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none text-soft-white/90 mb-12">
            <p className="mb-6 text-lg leading-relaxed">
              Ela chegou como chega a primavera: sem alarde, mas transformando tudo ao seu redor. 
              Seus olhos contam histórias que palavras jamais conseguiriam expressar, e seu sorriso é o 
              amanhecer que espanto toda escuridão.
            </p>
            
            <p className="mb-6 text-lg leading-relaxed">
              Cada momento ao seu lado é uma página nova em um livro infinito que estamos escrevendo juntos. 
              Ela é musa e companheira, inspiração e porto seguro. Com ela aprendi que poesia não se escreve 
              apenas com palavras, mas também com gestos, olhares e silêncios compartilhados.
            </p>
            
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gold">
                <Star size={16} fill="currentColor" />
                <Heart size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              Se as estrelas pudessem falar, contariam sobre as noites em que olhamos juntos para o céu, 
              compartilhando sonhos e planos. Se o vento pudesse cantar, entoaria as melodias que nos acompanharam 
              em cada jornada. Esta seção é uma singela homenagem a quem torna cada dia uma nova oportunidade 
              para encontrar beleza no mundo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 border border-light-deep-blue/30">
              <h3 className="text-xl font-serif text-gold mb-4">Momentos Favoritos</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90"></span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90"></span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90"></span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90"</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 border border-light-deep-blue/30">
              <h3 className="text-xl font-serif text-gold mb-4">O Que Aprendi Com Ela</h3>
              <ul className="space-y-3">
              
                </li>
              </ul>
            </div>
          </div>
          
          <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 border border-light-deep-blue/30 mb-8">
            <h3 className="text-xl font-serif text-gold flex items-center mb-6">
              <Quote size={18} className="mr-2" /> Palavras Para Ela
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quotes.map((item, index) => (
                <div key={index} className="bg-deep-blue/50 rounded-lg p-4 border border-light-deep-blue/30">
                  <blockquote className="text-soft-white/90 italic mb-2">
                    "{item.quote}"
                  </blockquote>
                  <footer className="text-right text-gold/70 text-sm">
                    — {item.author}
                  </footer>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AMusa;