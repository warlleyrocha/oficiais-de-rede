import { useNavigate } from 'react-router-dom';
import { PackageCheck, History, Package } from 'lucide-react';
import LogoCompany from '@/assets/logo.png';

export default function Home() {
  const navigate = useNavigate();

  const buttons = [
    {
      id: 1,
      label: 'Baixa de Material',
      description: 'Registrar materiais utilizados',
      icon: <Package size={28} color="#be3100" />,
      path: '/material-register',
      color: 'from-[#be3100] to-[#93AEC5]',
      bgColor: 'bg-purple-50',
    },
    {
      id: 2,
      label: 'Requisição de Material',
      description: 'Solicitar novos materiais',
      icon: <PackageCheck size={28} color="#be3100" />,
      path: '/material-requisition',
      color: 'from-[#be3100] to-[#93AEC5]',
      bgColor: 'bg-purple-50',
    },
    {
      id: 3,
      label: 'Relatório de Serviços',
      description: 'Gerar relatório de serviços realizados',
      icon: <History size={28} color="#be3100" />,
      path: '/service-report',
      color: 'from-[#be3100] to-[#AFC5DC]',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-4">
        {/* Header */}
        <div className="text-center mb-8 flex justify-center">
          <img src={LogoCompany} alt="Logo" className="w-[200px] h-[200px] object-contain" />
        </div>

        {buttons.map((button) => (
          <button
            key={button.id}
            className="w-full p-0 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all bg-white duration-200 active:scale-98 cursor-pointer group border-0"
            onClick={() => button.path && navigate(button.path)}
          >
            <div className={`h-1 bg-gradient-to-r ${button.color}`} />
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div
                  className={`p-4 rounded-full ${button.bgColor} group-hover:scale-110 transition-transform duration-200`}
                >
                  <div className={`bg-gradient-to-r ${button.color} bg-clip-text`}>
                    {button.icon}
                  </div>
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-lg text-[#302b4b] mb-1">{button.label}</h3>
                  <p className="text-gray-600 text-sm">{button.description}</p>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
