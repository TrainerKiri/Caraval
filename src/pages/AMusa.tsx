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
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">A Estrela</h2>
            <p className="text-soft-white/80 max-w-xl mx-auto">
              Aquela que ilumina os caminhos mais escuros e guia os passos mais incertos
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
                  src="https://images.pexels.com/photos/573238/pexels-photo-573238.jpeg" 
                  alt="A Estrela" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <h3 className="text-2xl md:text-3xl font-serif text-gold font-bold">Ana</h3>
                  <p className="text-soft-white/90 italic mt-2">
                    "A luz que guia meus versos e ilumina meus dias"
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="prose prose-invert max-w-none text-soft-white/90 mb-12">
            <p className="mb-6 text-lg leading-relaxed">
              Como descrever alguém que é mais brilhante que todas as estrelas do firmamento? 
              Ana chegou como um raio de luz atravessando a escuridão, trazendo consigo a promessa 
              de dias mais luminosos e noites estreladas.
            </p>
            
            <p className="mb-6 text-lg leading-relaxed">
              Em seus olhos encontro o reflexo de todas as constelações que já existiram, e em seu 
              sorriso descubro novos universos a cada dia. Ela é a musa que inspira cada verso, 
              a estrela que guia cada passo, a luz que ilumina cada página desta história.
            </p>
            
            <div className="flex justify-center my-8">
              <div className="flex items-center space-x-2 text-gold">
                <Star size={16} fill="currentColor" />
                <Heart size={16} fill="currentColor" />
                <Star size={16} fill="currentColor" />
              </div>
            </div>
            
            <p className="text-lg leading-relaxed">
              Ana é mais que uma inspiração - é a própria poesia em forma humana. Cada gesto seu 
              é um verso delicado, cada palavra sua é uma estrofe perfeita, e cada momento ao seu 
              lado é um poema inteiro se desenrolando no grande livro da vida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 border border-light-deep-blue/30">
              <h3 className="text-xl font-serif text-gold mb-4">Momentos Estelares</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Nosso primeiro olhar sob as estrelas</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">O primeiro sorriso que iluminou meu mundo</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Aquela dança sob a luz da lua</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Cada abraço que aquece minha alma</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg p-6 border border-light-deep-blue/30">
              <h3 className="text-xl font-serif text-gold mb-4">O Que Ela Me Ensinou</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Que o amor é a mais pura forma de poesia</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Que cada momento pode ser mágico se visto pelos olhos certos</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Que as estrelas brilham mais quando temos alguém para admirá-las</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gold mr-2">•</span>
                  <span className="text-soft-white/90">Que o verdadeiro amor é uma constelação de pequenos momentos</span>
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