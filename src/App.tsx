import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import { MaterialRegister } from './pages/MaterialRegister';
import ServiceReport from './pages/ServiceReport';
import { RequestMaterial } from './pages/MaterialRequisition';
import { HistoryPage } from './pages/MaterialHistory';
import Home from './pages/Home';
import SplashScreen from '@/components/SplashScreen';
import type { HistoryType } from '@/types/history';
import { HISTORY_TYPE_LABELS } from '@/types/history';

function AppContent() {
  const location = useLocation();

  // Verifica se não está na home
  const showHeader = location.pathname !== '/';

  // Verifica se é uma rota de histórico
  const isHistoryRoute = location.pathname.startsWith('/historico/');
  let headerTitle = '';
  let headerSubtitle = '';
  let historyType: HistoryType | undefined;
  let showHistoryButton = false;

  if (isHistoryRoute) {
    // Extrai o tipo do histórico da URL
    const match = location.pathname.match(/^\/historico\/([^/]+)/);
    const typeFromUrl = match?.[1];
    const validType: HistoryType | undefined =
      typeFromUrl && ['material', 'request', 'service'].includes(typeFromUrl)
        ? (typeFromUrl as HistoryType)
        : 'material';

    headerTitle = `Histórico - ${HISTORY_TYPE_LABELS[validType]}`;
    headerSubtitle = 'Visualize seus lançamentos anteriores';
    historyType = validType;
    showHistoryButton = false; // Não mostra botão de histórico na própria página de histórico
  } else {
    // Configurações das rotas normais
    const routeConfig: Record<
      string,
      { title: string; subtitle: string; historyType?: HistoryType }
    > = {
      '/material-register': {
        title: 'Baixa de Material',
        subtitle: 'Registrar materiais utilizados',
        historyType: 'material',
      },
      '/material-requisition': {
        title: 'Requisição de Material',
        subtitle: 'Solicitar novos materiais',
        historyType: 'request',
      },
      '/service-report': {
        title: 'Relatório de Serviços',
        subtitle: 'Gerar relatório de serviços realizados',
        historyType: 'service',
      },
    };

    // Pega as configurações da rota atual
    const currentRoute = routeConfig[location.pathname];
    headerTitle = currentRoute?.title || '';
    headerSubtitle = currentRoute?.subtitle || '';
    historyType = currentRoute?.historyType;
    showHistoryButton = !!historyType;
  }

  return (
    <>
      {showHeader && (
        <Header
          title={headerTitle}
          subtitle={headerSubtitle}
          showHistoryButton={showHistoryButton}
          historyType={historyType}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 pt-[4px] px-[16px] pb-[8px]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/material-register" element={<MaterialRegister />} />
          <Route path="/material-requisition" element={<RequestMaterial />} />
          <Route path="/service-report" element={<ServiceReport />} />
          <Route path="/historico/:type" element={<HistoryPage />} />
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
