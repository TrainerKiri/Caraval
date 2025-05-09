import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-light-deep-blue/20 text-center">
      <div className="container mx-auto px-4">
        <p className="text-xs text-soft-white/50">
          O Senhor Aluado Tem o Prazer de Apresentar as Suas Memorias
        </p>
      </div>
    </footer>
  );
}

export default Footer;