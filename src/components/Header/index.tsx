import { useNavigate } from 'react-router-dom';
import { FiClock } from 'react-icons/fi';

import FFALogo from '@/assets/logoFFA.png';

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
    <header className="relative overflow-hidden bg-gradient-to-r from-[#302b4b] to-[#b00000] shadow-md border-b border-transparent">
      {/* Bolas de fundo */}
      <div className="absolute -top-16 -left-16 h-52 w-52 rounded-full bg-[#4a3f6b] opacity-30"></div>
      <div className="absolute -bottom-16 -right-16 h-72 w-72 rounded-full bg-[#d63333] opacity-30"></div>

      {/* Conteúdo */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8 flex justify-between items-center">
        {/* Ícone + título */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-white/25 cursor-pointer rounded-lg px-2 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Ir para Home"
          >
            <img src={FFALogo} alt="FFA Logo" className="w-[80px] h-[80px] object-contain" />
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
            className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/30 hover:border-white/50 shadow-lg"
            aria-label="Ver histórico"
          >
            <FiClock className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Histórico</span>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
