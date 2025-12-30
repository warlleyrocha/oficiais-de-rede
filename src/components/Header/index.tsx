import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

import LogoCompany from '@/assets/logo.png';

type HeaderProps = {
  readonly title: string;
  readonly subtitle?: string;
  readonly showHistoryButton?: boolean;
  readonly historyType?: 'material' | 'request' | 'service';
};

export function Header({
  title,
  subtitle,
  showHistoryButton = false,
  historyType = 'material',
}: HeaderProps) {
  const navigate = useNavigate();
  const handleHistoryClick = () => {
    navigate(`/historico/${historyType}`);
  };

  return (
    <header className="relative overflow-hidden bg-[#1E2A36]  shadow-md border-b border-white/10">
      
      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto px-0 py-3 flex justify-between items-center">
        {/* Ícone + título */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="cursor-pointer rounded-lg flex items-center justify-center "
            aria-label="Ir para Home"
          >
            <img src={LogoCompany} alt="FFA Logo" className="w-[80px] h-[80px] object-contain" />
          </button>
          <div className="flex flex-col space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-white">{title}</h1>
            <p className="text-sm md:text-base text-white/75">{subtitle}</p>
          </div>
        </div>
        {/* Botão de Histórico */}
        {showHistoryButton && (
          <button
            type="button"
            onClick={handleHistoryClick}
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 mr-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg"
            aria-label="Ver histórico"
          >
            <FiClock className="w-5 h-5" />
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
