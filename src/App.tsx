import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { MaterialRegister } from './pages/MaterialRegister';
import ServiceReport from './pages/ServiceReport';
import { RequestMaterial } from './pages/MaterialRequisition';
import Home from './pages/Home';
import SplashScreen from '@/components/SplashScreen';

function AppContent() {
  const [launches, setLaunches] = useState<any[]>([]);
  const location = useLocation();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('launches') || '[]');
    setLaunches(saved);
  }, []);

  const handleNewLaunch = (launch: any) => {
    setLaunches((prev) => [...prev, launch]);
  };

  // Verifica se não está na home
  const showHeader = location.pathname !== '/';

  // Titles
  const routeTitles: Record<string, string> = {
    '/material-register': 'Baixa de Material',
    '/material-requisition': 'Requisição de Material',
    '/service-report': 'Relatório de Serviços',
  };

  //Subtitles
  const routeSubtitles: Record<string, string> = {
    '/material-register': 'Registrar materiais utilizados',
    '/material-requisition': 'Solicitar novos materiais',
    '/service-report': 'Gerar relatório de serviços realizados',
  };

  // Define o título com base na rota atual
  const headerTitle = routeTitles[location.pathname] || '';
  const headerSubtitle = routeSubtitles[location.pathname] || '';

  return (
    <>
      {showHeader && <Header title={headerTitle} subtitle={headerSubtitle} />}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-[4px] px-[16px] pb-[8px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/material-register"
            element={<MaterialRegister onNewLaunch={handleNewLaunch} />}
          />
          <Route path="/material-requisition" element={<RequestMaterial />} />
          <Route path="/service-report" element={<ServiceReport />} />
        </Routes>

        <footer className="mt-[20px] text-center text-sm text-gray-500 pt-6">
          Desenvolvido por{' '}
          <a
            href="https://www.linkedin.com/in/warlley-rossmann-rocha/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Warlley Rocha
          </a>
        </footer>
      </div>
    </>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return <SplashScreen />;
  }
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
