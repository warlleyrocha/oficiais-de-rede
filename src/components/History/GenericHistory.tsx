import { useState } from 'react';
import {
  FiChevronDown,
  FiMapPin,
  FiUsers,
  FiPackage,
  FiCalendar,
  FiClock,
  FiTool,
} from 'react-icons/fi';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import type {
  HistoryItem,
  HistoryType,
  MaterialLaunch,
  MaterialRequest,
  ServiceReport,
} from '@/types/history';

const formatDateForLaunch = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

type GenericHistoryProps = {
  readonly items: HistoryItem[];
  readonly type: HistoryType;
};

export function GenericHistory({ items, type }: GenericHistoryProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const sortedItems = [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  if (sortedItems.length === 0) {
    return (
      <div className="max-w-6xl mx-auto mt-8">
        <p className="text-center text-gray-500 text-lg">Nenhum lançamento encontrado.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto mt-8 space-y-4 min-h-screen pb-8">
      {sortedItems.map((item) => {
        const itemDate = new Date(item.date);
        const formattedDate = formatDateForLaunch(item.date);
        const formattedTime = itemDate.toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        });
        const isOpen = openItems.has(item.id);

        return (
          <Collapsible key={item.id} open={isOpen} onOpenChange={() => toggleItem(item.id)}>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200">
              <CollapsibleTrigger className="w-full">
                <div className="flex items-center justify-between p-5 cursor-pointer group">
                  <div className="flex-1 text-left space-y-2">
                    {/* Header baseado no tipo */}
                    {type === 'material' && (
                      <MaterialLaunchHeader
                        item={item as MaterialLaunch}
                        formattedDate={formattedDate}
                        formattedTime={formattedTime}
                      />
                    )}
                    {type === 'request' && (
                      <RequestHeader
                        item={item as MaterialRequest}
                        formattedDate={formattedDate}
                        formattedTime={formattedTime}
                      />
                    )}
                    {type === 'service' && (
                      <ServiceReportHeader
                        item={item as ServiceReport}
                        formattedDate={formattedDate}
                        formattedTime={formattedTime}
                      />
                    )}
                  </div>
                  <FiChevronDown
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:text-gray-600 ${
                      isOpen ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className="overflow-hidden data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up">
                <div className="px-5 pb-5 pt-2 space-y-5 border-t border-gray-100">
                  {/* Conteúdo baseado no tipo */}
                  {type === 'material' && <MaterialLaunchContent item={item as MaterialLaunch} />}
                  {type === 'request' && <RequestContent item={item as MaterialRequest} />}
                  {type === 'service' && <ServiceReportContent item={item as ServiceReport} />}
                </div>
              </CollapsibleContent>
            </div>
          </Collapsible>
        );
      })}
    </div>
  );
}

// Componentes de Header
function MaterialLaunchHeader({
  item,
  formattedDate,
  formattedTime,
}: {
  readonly item: MaterialLaunch;
  readonly formattedDate: string;
  readonly formattedTime: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-gray-600">
          <FiCalendar className="w-4 h-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          <FiClock className="w-4 h-4" />
          <span className="text-sm">{formattedTime}</span>
        </div>
        {item.activity && (
          <span className="bg-blue-50 text-blue-700 font-medium px-3 py-1 rounded-full text-xs border border-blue-200">
            {item.activity}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <FiMapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm">
          {item.city}, {item.street}
          {item.number && `, ${item.number}`}
        </span>
      </div>
    </>
  );
}

function RequestHeader({
  item,
  formattedDate,
  formattedTime,
}: {
  readonly item: MaterialRequest;
  readonly formattedDate: string;
  readonly formattedTime: string;
}) {
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-1.5 text-gray-600">
        <FiCalendar className="w-4 h-4" />
        <span className="text-sm font-medium">{formattedDate}</span>
      </div>
      <div className="flex items-center gap-1.5 text-gray-500">
        <FiClock className="w-4 h-4" />
        <span className="text-sm">{formattedTime}</span>
      </div>
      <span className="bg-green-50 text-green-700 font-medium px-3 py-1 rounded-full text-xs border border-green-200">
        Requisição
      </span>
    </div>
  );
}

function ServiceReportHeader({
  item,
  formattedDate,
  formattedTime,
}: {
  readonly item: ServiceReport;
  readonly formattedDate: string;
  readonly formattedTime: string;
}) {
  return (
    <>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-gray-600">
          <FiCalendar className="w-4 h-4" />
          <span className="text-sm font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-500">
          <FiClock className="w-4 h-4" />
          <span className="text-sm">
            {formattedTime} - {item.hour}
          </span>
        </div>
        <span className="bg-purple-50 text-purple-700 font-medium px-3 py-1 rounded-full text-xs border border-purple-200">
          {item.typeService}
        </span>
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <FiMapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm">{item.location}</span>
      </div>
    </>
  );
}

// Componentes de Conteúdo
function MaterialLaunchContent({ item }: { readonly item: MaterialLaunch }) {
  return (
    <>
      {/* Técnicos */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FiUsers className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-[#302b4b] text-sm">Técnicos</h3>
        </div>
        <div className="space-y-2">
          {item.officers.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 text-sm"
            >
              <span className="font-medium text-gray-700">{officer.name}</span>
              <span className="text-gray-500">Mat. {officer.registration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Materiais */}
      <MaterialsTable materials={item.materials} />
    </>
  );
}

function RequestContent({ item }: { readonly item: MaterialRequest }) {
  return (
    <>
      {/* Técnicos */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FiUsers className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-[#302b4b] text-sm">Solicitante</h3>
        </div>
        <div className="space-y-2">
          {item.officers.map((officer) => (
            <div
              key={officer.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 text-sm"
            >
              <span className="font-medium text-gray-700">{officer.name}</span>
              <span className="text-gray-500">Mat. {officer.registration}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Materiais */}
      <MaterialsTable materials={item.materials} />
    </>
  );
}

function ServiceReportContent({ item }: { readonly item: ServiceReport }) {
  return (
    <>
      {/* Detalhes do Serviço */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <FiTool className="w-4 h-4 text-gray-400" />
          <h3 className="font-semibold text-[#302b4b] text-sm">Detalhes do Serviço</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 bg-gray-50 rounded-lg p-4 text-sm">
          <div>
            <span className="text-gray-500">Supervisor:</span>
            <span className="ml-2 font-medium text-gray-700">{item.supervisor}</span>
          </div>
          <div>
            <span className="text-gray-500">Equipe:</span>
            <span className="ml-2 font-medium text-gray-700">{item.team}</span>
          </div>
          <div>
            <span className="text-gray-500">Testado por:</span>
            <span className="ml-2 font-medium text-gray-700">{item.testBy}</span>
          </div>
          <div>
            <span className="text-gray-500">Causa:</span>
            <span className="ml-2 font-medium text-gray-700">{item.causeFailure}</span>
          </div>
          <div>
            <span className="text-gray-500">Endereço da Falha:</span>
            <span className="ml-2 font-medium text-gray-700">{item.faultAdress}</span>
          </div>
          <div>
            <span className="text-gray-500">Normalização:</span>
            <span className="ml-2 font-medium text-gray-700">{item.timeNormalized}</span>
          </div>
        </div>
      </div>

      {/* Materiais */}
      <MaterialsTable materials={item.materials} />

      {/* Observações */}
      {(item.pending || item.comments) && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <h3 className="font-semibold text-[#302b4b] text-sm">Observações</h3>
          </div>
          <div className="space-y-2 bg-gray-50 rounded-lg p-4 text-sm">
            {item.pending && (
              <div>
                <span className="text-gray-500 font-medium">Pendências:</span>
                <p className="mt-1 text-gray-700">{item.pending}</p>
              </div>
            )}
            {item.comments && (
              <div>
                <span className="text-gray-500 font-medium">Comentários:</span>
                <p className="mt-1 text-gray-700">{item.comments}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

// Componente reutilizável de tabela de materiais
function MaterialsTable({
  materials,
}: {
  readonly materials: {
    readonly id: string;
    readonly name: string;
    readonly code?: string;
    readonly unit: 'unidade' | 'metro';
    readonly quantity: number;
  }[];
}) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <FiPackage className="w-4 h-4 text-gray-400" />
        <h3 className="font-semibold text-[#302b4b] text-sm">Materiais</h3>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Nome</th>
              <th className="text-left p-3 font-semibold text-gray-700">Código</th>
              <th className="text-right p-3 font-semibold text-gray-700">Quantidade</th>
              <th className="text-left p-3 font-semibold text-gray-700">Unidade</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat, index) => (
              <tr
                key={mat.id}
                className={`${
                  index < materials.length - 1 ? 'border-b border-gray-100' : ''
                } hover:bg-gray-50 transition-colors`}
              >
                <td className="p-3 text-gray-700">{mat.name}</td>
                <td className="p-3 text-gray-600">{mat.code ?? '-'}</td>
                <td className="p-3 text-right text-gray-700 font-medium">{mat.quantity}</td>
                <td className="p-3 text-gray-600">
                  {mat.unit === 'unidade' ? 'unidade(s)' : 'metro(s)'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
