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
          Primeiramente...

Bem-vindo às minhas memórias. Ou melhor, às nossas.
Porque muitas delas só ganham significado quando compartilhadas com alguém que se importa.

Mas aqui, no silêncio entre os dias, o papel de poeta, cronista ou talvez só um contador distraído de momentos... será meu.

Quem sou eu?
Isso talvez seja o menos importante.
Mas, já que estamos aqui, você pode me chamar de Aiónskald —
um nome que carrega o peso de mil instantes, o som de uma canção esquecida, e o ressoar das lembranças que nunca se apagam.
Ou, se preferir, Senhor Aluado — o nome que flutua entre o devaneio e o riso, como uma estrela fugaz no céu da nossa história.
E, um dia, quem sabe, eu explico o porquê de cada um desses nomes.
Mas hoje, basta saber que sou alguém que, como você, viveu e amou cada segundo que aqui compartilho.

Se você está lendo estas palavras, é porque eu confio em você.
Não apenas para ver o que está aqui, mas para sentir o que foi deixado, escondido entre as palavras, nas brechas do tempo.

Cada memória que deixo registrada aqui não é só uma foto, nem apenas uma data.
É um fragmento de um tempo que congelei com carinho,
um momento em que o mundo parecia fazer sentido, ou ao menos… parecia ter valido a pena.

Você vai encontrar coisas simples, algumas doces, outras talvez um pouco confusas.
E tudo bem.
Às vezes, até rir sozinho é necessário para entender o que o coração tenta dizer.

Espero que, enquanto explora este cantinho, suspenso no espaço e no tempo,
você se permita sorrir, se perder um pouco, talvez até se encontrar em algo que não esperava.
Porque, no fundo...
essa não é só a minha história.
É a nossa história, contada a partir do meu olhar, mas sempre esperando que você a enxergue com os seus próprios olhos.

Com gratidão, um toque de luar, e o silêncio que só o tempo pode trazer,

Aiónskald
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
            Virando As Cartas <ChevronRight size={18} className="ml-2 group-hover:animate-bounce-x" />
          </span>
        </button>
      </div>
    </div>
  );
}

export default Entrada;