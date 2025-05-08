import React, { useState } from 'react';
import { MemoriesProvider } from './contexts/MemoriesContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Entrada from './pages/Entrada';
import OPoeta from './pages/OPoeta';
import MemoriasGaleria from './pages/MemoriasGaleria';
import AMusa from './pages/AMusa';
import Tesouros from './pages/Tesouros';
import SobreNos from './pages/SobreNos';
import Creditos from './pages/Creditos';

function App() {
  const [currentPage, setCurrentPage] = useState('entrada');

  const renderPage = () => {
    switch (currentPage) {
      case 'entrada':
        return <Entrada onExplore={() => setCurrentPage('memorias')} />;
      case 'poeta':
        return <OPoeta />;
      case 'memorias':
        return <MemoriasGaleria />;
      case 'musa':
        return <AMusa />;
      case 'tesouros':
        return <Tesouros />;
      case 'sobrenos':
        return <SobreNos />;
      case 'creditos':
        return <Creditos />;
      default:
        return <Entrada onExplore={() => setCurrentPage('memorias')} />;
    }
  };

  return (
    <MemoriesProvider>
      <div className="min-h-screen flex flex-col bg-deep-blue text-soft-white">
        <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </MemoriesProvider>
  );
}

export default App;