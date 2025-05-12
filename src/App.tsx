import React, { useState } from 'react';
import { MemoriesProvider } from './contexts/MemoriesContext';
import { AuthProvider } from './contexts/AuthContext';
import { TreasuresProvider } from './contexts/TreasuresContext';
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
import { Loader } from 'lucide-react';

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-blue">
      <div className="text-center">
        <Loader className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
        <p className="text-soft-white/70 font-serif">Carregando memórias...</p>
      </div>
    </div>
  );
}

function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-deep-blue">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-red-400 mb-4">⚠️</div>
        <h2 className="text-xl font-serif text-soft-white mb-2">Algo deu errado</h2>
        <p className="text-soft-white/70">{message}</p>
      </div>
    </div>
  );
}

function AppContent() {
  const [currentPage, setCurrentPage] = useState('entrada');
  const { isAdmin, loading, error } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error} />;
  }

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
        <TreasuresProvider>
          <AppContent />
        </TreasuresProvider>
      </MemoriesProvider>
    </AuthProvider>
  );
}

export default App;