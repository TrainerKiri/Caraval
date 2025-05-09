import React, { useState, useEffect } from 'react';
import { MessageSquare, Bookmark, Music, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Tesouros() {
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('conversas');
  const { isAdmin } = useAuth();
  
  useEffect(() => {
    setVisible(true);
  }, []);
  
  const tabItems = [
    { id: 'conversas', label: 'Conversas', icon: <MessageSquare size={16} /> },
    { id: 'poemas', label: 'Poemas', icon: <Bookmark size={16} /> },
    { id: 'musicas', label: 'Músicas', icon: <Music size={16} /> },
    { id: 'cartas', label: 'Cartas', icon: <FileText size={16} /> },
  ];
  
  const renderTabContent = () => {
    switch (activeTab) {
      case 'conversas':
        return <ConversasTab isAdmin={isAdmin} />;
      case 'poemas':
        return <PoemasTab isAdmin={isAdmin} />;
      case 'musicas':
        return <MusicasTab isAdmin={isAdmin} />;
      case 'cartas':
        return <CartasTab isAdmin={isAdmin} />;
      default:
        return <ConversasTab isAdmin={isAdmin} />;
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className={`transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-serif text-gold mb-4">Tesouros</h2>
            <p className="text-soft-white/80 max-w-xl mx-auto">
              Pequenas preciosidades coletadas ao longo do caminho
            </p>
            <div className="flex justify-center mt-2">
              <div className="w-20 h-0.5 bg-gold/30"></div>
            </div>
          </div>
          
          <div className="bg-light-deep-blue/20 backdrop-blur-sm rounded-lg border border-light-deep-blue/30 overflow-hidden">
            <div className="flex flex-wrap border-b border-light-deep-blue/30">
              {tabItems.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-gold bg-light-deep-blue/40 border-b-2 border-gold'
                      : 'text-soft-white/70 hover:text-soft-white hover:bg-light-deep-blue/30'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="p-6">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConversasTab({ isAdmin }: { isAdmin: boolean }) {
  const conversations = [
    {
      date: '10 de Maio, 2023',
      messages: [
        { person: 'Ela', text: 'Sabe aquela sensação de que estávamos destinados a nos encontrar?' },
        { person: 'Eu', text: 'Como se todas as decisões que tomamos nos levassem a este exato momento?' },
        { person: 'Ela', text: 'Exatamente isso. Como se o universo fosse um grande quebra-cabeça...' },
        { person: 'Eu', text: 'E nós fôssemos duas peças feitas para se encaixarem.' },
      ]
    },
    {
      date: '23 de Agosto, 2023',
      messages: [
        { person: 'Eu', text: 'Se pudesse viajar para qualquer época, qual escolheria?' },
        { person: 'Ela', text: 'Talvez os anos 20 em Paris, com todos aqueles artistas e escritores.' },
        { person: 'Eu', text: 'Poderíamos tomar café com Hemingway e dançar ao som do jazz.' },
        { person: 'Ela', text: 'Mas pensando bem, prefiro estar aqui e agora, criando nossas próprias histórias.' },
      ]
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Conversas Preciosas</h3>
        {isAdmin && (
          <button className="text-gold hover:text-gold/80 transition-colors">
            + Adicionar Conversa
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {conversations.map((convo, index) => (
          <div key={index} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-soft-white/60 text-sm">{convo.date}</span>
              {isAdmin && (
                <div className="flex gap-2">
                  <button className="text-soft-white/60 hover:text-soft-white">Editar</button>
                  <button className="text-red-400 hover:text-red-300">Excluir</button>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {convo.messages.map((msg, msgIndex) => (
                <div 
                  key={msgIndex} 
                  className={`flex ${msg.person === 'Eu' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-lg p-3 ${
                      msg.person === 'Eu' 
                        ? 'bg-gold/20 text-soft-white' 
                        : 'bg-light-deep-blue/40 text-soft-white/90'
                    }`}
                  >
                    <div className="text-xs font-medium mb-1">
                      {msg.person}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PoemasTab({ isAdmin }: { isAdmin: boolean }) {
  const poems = [
    {
      title: 'Sussurro das Estrelas',
      content: `Entre constelações dançantes,
Encontrei seu olhar,
Como bússola celestial
A me guiar.

Cada verso deste poema
É estrela em seu firmamento,
Pequena luz que brilha
No infinito deste momento.`,
      date: 'Primavera de 2023'
    },
    {
      title: 'Cartografia dos Sonhos',
      content: `Há mapas que não se desenham em papel,
Mas na pele, nos olhares, nos silêncios.
Há jornadas que não se medem em distâncias,
Mas em batimentos, em sorrisos, em memórias.

E neste atlas de nós dois,
Cada abraço é um continente descoberto,
Cada beijo, um oceano navegado,
Cada promessa, uma constelação a guiar-nos.`,
      date: 'Outono de 2022'
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Poemas & Escritos</h3>
        {isAdmin && (
          <button className="text-gold hover:text-gold/80 transition-colors">
            + Adicionar Poema
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {poems.map((poem, index) => (
          <div key={index} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-lg font-serif text-gold">{poem.title}</h4>
              {isAdmin && (
                <div className="flex gap-2">
                  <button className="text-soft-white/60 hover:text-soft-white">Editar</button>
                  <button className="text-red-400 hover:text-red-300">Excluir</button>
                </div>
              )}
            </div>
            <div className="whitespace-pre-line text-soft-white/90 italic mb-4">
              {poem.content}
            </div>
            <div className="text-right">
              <span className="text-soft-white/60 text-sm">{poem.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MusicasTab({ isAdmin }: { isAdmin: boolean }) {
  const playlists = [
    {
      name: 'Nossas Canções',
      description: 'Trilha sonora dos nossos momentos especiais',
      songs: [
        { title: 'Perfect', artist: 'Ed Sheeran', memory: 'Nossa dança no casamento dos amigos' },
        { title: 'Photograph', artist: 'Ed Sheeran', memory: 'Viagem à praia' },
        { title: 'All of Me', artist: 'John Legend', memory: 'Nosso primeiro jantar romântico' },
        { title: 'Yellow', artist: 'Coldplay', memory: 'Caminhada no parque ao pôr do sol' },
      ]
    },
    {
      name: 'Para Dias de Chuva',
      description: 'Canções para ouvir abraçados enquanto chove lá fora',
      songs: [
        { title: 'The Scientist', artist: 'Coldplay', memory: 'Tarde de domingo com chocolate quente' },
        { title: 'Fix You', artist: 'Coldplay', memory: 'Momento difícil que superamos juntos' },
        { title: 'Falling Slowly', artist: 'Glen Hansard & Markéta Irglová', memory: 'Filme que assistimos na primeira semana juntos' },
      ]
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Nossas Melodias</h3>
        {isAdmin && (
          <button className="text-gold hover:text-gold/80 transition-colors">
            + Adicionar Playlist
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {playlists.map((playlist, index) => (
          <div key={index} className="bg-deep-blue/50 rounded-lg overflow-hidden border border-light-deep-blue/30">
            <div className="p-5">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-serif text-gold mb-1">{playlist.name}</h4>
                  <p className="text-soft-white/70 text-sm">{playlist.description}</p>
                </div>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button className="text-soft-white/60 hover:text-soft-white">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Excluir</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="border-t border-light-deep-blue/30">
              {playlist.songs.map((song, songIndex) => (
                <div 
                  key={songIndex}
                  className={`flex flex-col sm:flex-row sm:items-center p-4 ${
                    songIndex % 2 === 0 ? 'bg-light-deep-blue/10' : ''
                  }`}
                >
                  <div className="flex-1">
                    <div className="font-medium text-soft-white">{song.title}</div>
                    <div className="text-soft-white/60 text-sm">{song.artist}</div>
                  </div>
                  <div className="mt-2 sm:mt-0 text-soft-white/70 text-sm italic">
                    "{song.memory}"
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CartasTab({ isAdmin }: { isAdmin: boolean }) {
  const letters = [
    {
      title: 'Para abrir quando sentir saudade',
      date: '15 de Janeiro, 2023',
      content: `Minha querida,

Quando seus olhos encontrarem estas palavras, provavelmente estarei pensando em você, mesmo que à distância. A saudade é como maré: às vezes recua, às vezes avança com força total, mas sempre está lá, no horizonte dos nossos sentimentos.

Quero que saiba que em cada momento de ausência, estou tecendo novos sonhos para compartilharmos. Cada segundo longe é apenas um passo na direção do nosso próximo reencontro.

Até breve, até sempre,
Seu poeta`
    },
    {
      title: 'Para ler em um dia especial',
      date: '30 de Abril, 2023',
      content: `Luz dos meus dias,

Esta carta é uma pequena cápsula do tempo. Nela coloco todo o amor que sinto agora, para que no futuro, quando a rotina tentar nos convencer que o extraordinário é comum, você possa lembrar deste sentimento em sua forma mais pura.

Celebrações são apenas desculpas para expressarmos o que sentimos todos os dias. Cada amanhecer ao seu lado é motivo de festa, cada sorriso seu é presente desembrulhado.

Com todo meu coração,
Quem te ama infinitamente`
    }
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-gold">Cartas & Bilhetes</h3>
        {isAdmin && (
          <button className="text-gold hover:text-gold/80 transition-colors">
            + Adicionar Carta
          </button>
        )}
      </div>
      
      <div className="space-y-8">
        {letters.map((letter, index) => (
          <div key={index} className="bg-deep-blue/50 rounded-lg p-5 border border-light-deep-blue/30">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-serif text-gold">{letter.title}</h4>
              <div className="flex items-center gap-4">
                <span className="text-soft-white/60 text-sm">{letter.date}</span>
                {isAdmin && (
                  <div className="flex gap-2">
                    <button className="text-soft-white/60 hover:text-soft-white">Editar</button>
                    <button className="text-red-400 hover:text-red-300">Excluir</button>
                  </div>
                )}
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute top-0 right-0">
                <Sparkles size={16} className="text-gold/50" />
              </div>
              
              <div className="bg-light-deep-blue/20 rounded p-4 font-serif whitespace-pre-line text-soft-white/90 italic">
                {letter.content}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tesouros;