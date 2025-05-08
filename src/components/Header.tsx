import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { id: 'entrada', label: 'Início' },
    { id: 'poeta', label: 'O Poeta' },
    { id: 'memorias', label: 'Memórias' },
    { id: 'musa', label: 'A Musa' },
    { id: 'tesouros', label: 'Tesouros' },
    { id: 'sobrenos', label: 'Nossa História' },
    { id: 'creditos', label: 'Epílogo' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-deep-blue/90 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 
          className="font-serif text-2xl text-gold cursor-pointer"
          onClick={() => setCurrentPage('entrada')}
        >
          Memórias Encantadas
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative font-medium text-sm uppercase tracking-wider transition-colors duration-300 ${
                    currentPage === item.id 
                      ? 'text-gold' 
                      : 'text-soft-white hover:text-gold'
                  }`}
                >
                  {item.label}
                  {currentPage === item.id && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gold"></span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-soft-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-deep-blue/95 backdrop-blur-lg">
          <ul className="flex flex-col py-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    setCurrentPage(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full py-3 px-4 text-left ${
                    currentPage === item.id 
                      ? 'text-gold bg-light-deep-blue/20' 
                      : 'text-soft-white'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Header;