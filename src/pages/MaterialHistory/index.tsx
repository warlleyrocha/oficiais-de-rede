import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GenericHistory } from '@/components/History/GenericHistory';
import type { HistoryItem, HistoryType } from '@/types/history';

import { getMaterialLaunches } from '@/services/storage/materialLaunchStorage';
import { getRequestLaunches } from '@/services/storage/requestStorage';
import { getServiceReports } from '@/services/storage/serviceReportStorage';

export function HistoryPage() {
  const { type } = useParams<{ type: HistoryType }>();
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Define o tipo padrão como 'material' se não for fornecido ou for inválido
  const historyType: HistoryType =
    type && ['material', 'request', 'service'].includes(type) ? type : 'material';

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        let data: HistoryItem[] = [];

        switch (historyType) {
          case 'material':
            data = getMaterialLaunches();
            break;
          case 'request':
            data = getRequestLaunches();
            break;
          case 'service':
            data = getServiceReports();
            break;
        }

        setItems(data);
      } catch (error) {
        console.error('Erro ao carregar histórico:', error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, [historyType]);

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#302b4b] mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando histórico...</p>
          </div>
        </div>
      ) : (
        <GenericHistory items={items} type={historyType} />
      )}
    </div>
  );
}
