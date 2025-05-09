import React, { useState } from 'react';
import { MemoriesProvider } from './contexts/MemoriesContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Entrada from './pages/Entrada';
import OPoeta from './pages/OPoeta';
import MemoriasGaleria from './pages/MemoriasGaleria';
import AMusa from './pages/AMusa';
import Tesouros from './pages/Tesouros';
import SobreNos from './pages/SobreNos';
import Creditos from './pages/Creditos';
import AdminLogin from './components/AdminLogin';
import MagicalBackground from './components/MagicalBackground';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('entrada');
  const { isAdmin, loading } = useAuth();

  const renderPage = () => {
    switch (currentPage) {
      case 'entrada':
        return <Entrada onExplore={() => setCurrentPage('memorias')} />;
      case 'poeta':
        return <OPoeta />;
      case 'memorias':
        return <MemoriasGaleria />;
      case 'estrela':
        return <AMusa />;
      case 'tesouros':
        return <Tesouros />;
      case 'sobrenos':
        return <SobreNos />;
      case 'creditos':
        return <Creditos />;
      case 'admin':
        return isAdmin ? <MemoriasGaleria /> : <AdminLogin />;
      default:
        return <Entrada onExplore={() => setCurrentPage('memorias')} />;
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col relative">
      <MagicalBackground />
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} isAdmin={isAdmin} />
      <main className="flex-grow relative z-10">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MemoriesProvider>
        <AppContent />
      </MemoriesProvider>
    </AuthProvider>
  );
}

export default App;