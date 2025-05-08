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
                
<p>Quem é Aiónskald?

Não há uma resposta fácil para isso. Aiónskald não é uma figura divina ou uma entidade além da compreensão humana. Ele é apenas alguém, um homem como qualquer outro, com suas falhas e virtudes. Mas, ao mesmo tempo, é alguém que se entrega ao ofício de contar histórias e de guardar memórias com uma intensidade que poucos entendem.

O que o torna diferente, então?

Talvez seja a maneira como ele observa o mundo. A maneira como ele vê cada momento como algo que merece ser eternizado. Aiónskald não escreve apenas para registrar o que aconteceu — ele escreve para capturar a essência de cada experiência, para preservar o que, muitas vezes, se perde com o tempo. Seu nome, que é um jogo entre o eterno e o efêmero, reflete justamente isso: o desejo de transformar o simples em algo eterno, mesmo sabendo que a eternidade, no fim, é uma ilusão.

Ele é um homem comum, mas não vive de forma comum. Seu olhar curioso e atento para as pequenas coisas, seu jeito de mergulhar fundo nas memórias e transformá-las em algo maior, mais significativo — isso é o que o torna único. A cada memória que ele compartilha, Aiónskald revela um pedaço de sua alma, um fragmento de seu entendimento sobre a vida e sobre o que realmente importa.

Ele não é um mestre no sentido tradicional da palavra. Não há sabedoria absoluta em suas palavras, apenas uma compreensão que vem de vivências, de momentos sentidos e absorvidos. O Poeta é alguém que, como todos, comete erros e busca respostas, mas que escolheu deixar uma marca, um legado, através das histórias que conta.

E, como qualquer contador de histórias, Aiónskald deixa algo para o leitor, algo que vai além da narrativa. Não são apenas palavras, mas sentimentos, reflexões. Cada memória registrada aqui não é só um pedaço do passado; é uma lição, um convite para pensar, para se conectar com o que foi vivido. A cada história que você lê, Aiónskald revela um pouco mais de quem ele é — mas sempre de forma sutil, sem se revelar por completo.

Por que ele faz isso?
Porque, no fundo, o Poeta acredita que as histórias têm um poder peculiar. Elas nos conectam uns aos outros, atravessam o tempo e nos mostram que, por mais que mudemos, o essencial permanece. Ele acredita que, ao contar essas memórias, ele mantém viva a chama do que é humano, do que é real. O Poeta não precisa se mostrar como um ser sobrenatural para tocar os corações. Ele sabe que o simples fato de compartilhar uma memória já é um ato de magia por si só.

Então, quem é Aiónskald?

Ele é o homem que se tornou a memória. O contador de histórias que usa palavras para preservar o que o tempo tenta apagar. E talvez, no final, você perceba que ele não é apenas um narrador. Ele é uma ponte. Uma ponte entre o que foi e o que é, entre o que se perde e o que fica.

Com humildade e um toque de mistério,
Aiónskald, o Poeta.</p>
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