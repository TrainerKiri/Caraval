import React from 'react';
import { Heart } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full py-6 bg-light-deep-blue/20 text-center">
      <div className="container mx-auto px-4">
        <p className="flex items-center justify-center text-sm text-soft-white/70 mb-2">
          Criado com <Heart size={14} className="mx-1 text-gold animate-pulse" /> e nostalgia
        </p>
        <p className="text-xs text-soft-white/50">
          © {currentYear} Memórias Encantadas • Todos os direitos reservados
        </p>
      </div>
    </footer>
  );
}

export default Footer;