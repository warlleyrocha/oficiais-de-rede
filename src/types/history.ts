// types/historyTypes.ts

export type Material = {
  id: string;
  name: string;
  code?: string;
  unit: 'unidade' | 'metro';
  quantity: number;
};

export type Officer = {
  id: string;
  name: string;
  registration: string;
};

// Lançamento de Baixa de Material
export type MaterialLaunch = {
  id: string;
  type: 'material';
  date: string;
  activity?: string;
  city: string;
  street: string;
  number?: string;
  hood?: string;
  officers: Officer[];
  materials: Material[];
};

// Requisição de Material
export type MaterialRequest = {
  id: string;
  type: 'request';
  date: string;
  officers: Officer[];
  materials: Material[];
};

// Relatório de Serviço
export type ServiceReport = {
  id: string;
  type: 'service';
  supervisor: string;
  date: string;
  hour: string;
  location: string;
  typeService: string;
  team: string;
  timeDeparture: string;
  timeArrival: string;
  timeTests: string;
  timeFaultIdentified: string;
  causeFailure: string;
  faultAdress: string;
  timeNormalized: string;
  testBy: string;
  numberCableFault: string;
  batch: string;
  initialLength: string;
  finalLength: string;
  total: string;
  materials: Material[];
  pending?: string;
  comments?: string;
};

// Tipo unificado
export type HistoryItem = MaterialLaunch | MaterialRequest | ServiceReport;

export type HistoryType = 'material' | 'request' | 'service';

export const HISTORY_TYPE_LABELS: Record<HistoryType, string> = {
  material: 'Baixa de Material',
  request: 'Requisição de Material',
  service: 'Relatório de Serviço',
};
