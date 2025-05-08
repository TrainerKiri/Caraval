import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Star } from 'lucide-react';

function SobreNos() {
  const [visible, setVisible] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setVisible(true);
    
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    // Observe all timeline items
    if (timelineRef.current) {
      const items = timelineRef.current.querySelectorAll('.timeline-item');
      items.forEach(item => {
        observer.observe(item);
      });
    }
    
    return () => {
      if (timelineRef.current) {
        const items = timelineRef.current.querySelectorAll('.timeline-item');
        items.forEach(item => {
          observer.unobserve(item);
        });
      }
    };
  }, []);
  
  const timelineEvents = [
    {
      date: 'Março de 2020',
      title: 'O Primeiro Encontro',
      description: 'Um café despretensionso que durou horas. O início inesperado de algo especial.',
      image: 'https://images.pexels.com/photos/1233648/pexels-photo-1233648.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      date: 'Julho de 2020',
      title: 'A Primeira Viagem',
      description: 'Um fim de semana na praia que se transformou em memórias eternas.',
      image: 'https://images.pexels.com/photos/1139556/pexels-photo-1139556.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      date: 'Dezembro de 2020',
      title: 'Primeiro Natal Juntos',
      description: 'Entre presentes e abraços, descobrimos que o melhor presente era a presença um do outro.',
      image: 'https://images.pexels.com/photos/1741306/pexels-photo-1741306.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      date: 'Setembro de 2021',
      title: 'O Pedido',
      description: 'Sob um céu estrelado, promessas foram feitas e um novo capítulo começou.',
      image: 'https://images.pexels.com/photos/3352398/pexels-photo-3352398.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      date: 'Maio de 2022',
      title: 'A Grande Mudança',
      description: 'Duas vidas que se tornaram uma só, sob o mesmo teto, compartilhando sonhos e planos.',
      image: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    },
    {
      date: 'Presente',
      title: 'Nossa História Continua...',
      description: 'Cada dia é um novo capítulo que escrevemos juntos, um novo verso em nosso poema infinito.',
      image: 'https://images.pexels.com/photos/269583/pexels-photo-269583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">Nossa História</h2>
            <p className="text-soft-white/80 max-w-xl mx-auto">
              Uma jornada de momentos preciosos que construíram nosso caminho juntos
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="relative bg-light-deep-blue/10 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-light-deep-blue/30 mb-12">
            <h3 className="text-xl font-serif text-gold mb-6">A Dança do Destino</h3>
            
            <div className="prose prose-invert max-w-none text-soft-white/90 relative">
              <p className="mb-4 text-lg">
                Há histórias que começam com "era uma vez" e terminam com "felizes para sempre".
                A nossa não tem um fim, pois a escrevemos todos os dias, página após página, com
                tinta feita de risos, lágrimas, sonhos e promessas.
              </p>
              
              <p className="mb-4 text-lg">
                Quando o universo conspira para unir duas almas, nem mesmo o tempo pode ficar no caminho.
                Nossos caminhos poderiam ter se cruzado de mil maneiras diferentes, mas escolheram se
                encontrar exatamente como aconteceu - perfeito em sua imperfeição, único em sua simplicidade.
              </p>
              
              <p className="text-lg">
                Esta linha do tempo é mais que uma sequência de datas e eventos. É um mapa estelar
                dos momentos que definiram nossa jornada, das pequenas coincidências que, vistas de longe,
                formam a constelação da nossa história.
              </p>
              
              <div className="absolute -right-4 top-0 opacity-30 text-gold">
                <Star size={40} fill="currentColor" />
              </div>
            </div>
          </div>
          
          <div ref={timelineRef} className="relative">
            {/* Timeline center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold/80 via-gold/50 to-gold/10 transform -translate-x-1/2"></div>
            
            {/* Timeline events */}
            <div className="space-y-12 md:space-y-24">
              {timelineEvents.map((event, index) => (
                <div 
                  key={index} 
                  className={`timeline-item relative opacity-0 transition-opacity duration-1000 ${
                    index % 2 === 0 ? 'md:text-right' : ''
                  }`}
                >
                  {/* Date marker */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center">
                      <Calendar size={16} className="text-deep-blue" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div 
                    className={`md:w-[calc(50%-30px)] ${
                      index % 2 === 0 
                        ? 'md:mr-[30px] ml-auto' 
                        : 'md:ml-[30px]'
                    }`}
                  >
                    <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg overflow-hidden border border-light-deep-blue/30">
                      {/* Image */}
                      <div className="h-48 relative">
                        <img 
                          src={event.image} 
                          alt={event.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-blue via-deep-blue/50 to-transparent"></div>
                        
                        {/* Date overlay */}
                        <div className="absolute top-3 right-3 bg-deep-blue/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gold border border-gold/30">
                          {event.date}
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-5">
                        <h4 className="text-lg font-serif text-gold mb-2">{event.title}</h4>
                        <p className="text-soft-white/80">{event.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreNos;