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
            <div className="prose prose-invert max-w-none">
              <h3 className="text-2xl font-serif text-gold mb-6">Quem é Aiónskald?</h3>
              
              <p className="text-lg mb-6">
                Não há uma resposta fácil para isso. Aiónskald não é uma figura divina ou uma entidade além da compreensão humana. 
                Ele é apenas alguém, um homem como qualquer outro, com suas falhas e virtudes.
              </p>
              
              <h4 className="text-xl font-serif text-gold mb-4">O que o torna diferente, então?</h4>
              
              <p className="text-lg mb-6">
                Talvez seja a maneira como ele observa o mundo. A maneira como ele vê cada momento como algo que merece ser eternizado. 
                Aiónskald não escreve apenas para registrar o que aconteceu — ele escreve para capturar a essência de cada experiência.
              </p>
              
              <p className="text-lg mb-6">
                Seu nome, que é um jogo entre o eterno e o efêmero, reflete justamente isso: o desejo de transformar o simples em algo eterno, 
                mesmo sabendo que a eternidade, no fim, é uma ilusão.
              </p>
              
              <div className="my-8 border-l-4 border-gold/30 pl-6">
                <p className="text-xl font-serif text-gold italic">
                  "Ele é um homem comum, mas não vive de forma comum. Seu olhar curioso e atento para as pequenas coisas, 
                  seu jeito de mergulhar fundo nas memórias e transformá-las em algo maior, mais significativo — isso é o que o torna único."
                </p>
              </div>
              
              <p className="text-lg mb-6">
                A cada memória que ele compartilha, Aiónskald revela um pedaço de sua alma, um fragmento de seu entendimento sobre a vida 
                e sobre o que realmente importa.
              </p>
              
              <h4 className="text-xl font-serif text-gold mb-4">Por que ele faz isso?</h4>
              
              <p className="text-lg mb-6">
                Porque, no fundo, o Poeta acredita que as histórias têm um poder peculiar. Elas nos conectam uns aos outros, 
                atravessam o tempo e nos mostram que, por mais que mudemos, o essencial permanece.
              </p>
              
              <div className="text-right mt-8">
                <p className="text-gold italic">Com humildade e um toque de mistério,</p>
                <p className="text-gold font-serif text-lg">Aiónskald, o Poeta.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OPoeta;