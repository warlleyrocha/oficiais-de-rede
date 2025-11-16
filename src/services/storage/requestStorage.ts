// services/storage/requestStorage.ts
import type { RequestFormData } from '@/types/requestMaterial';
import type { MaterialRequest } from '@/types/history';

const STORAGE_KEY = 'material-requests';

/**
 * Recupera todos os lançamentos de requisição de material do localStorage
 */
export function getRequestLaunches(): MaterialRequest[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao recuperar requisições de material:', error);
    return [];
  }
}

/**
 * Converte dados do formulário para o formato MaterialRequest
 */
export function createRequestLaunchFromFormData(data: RequestFormData): MaterialRequest {
  const now = new Date();

  // Combina a data informada no form com a hora atual
  const [year, month, day] = data.officer.date.split('-');
  const dateWithTime = new Date(
    Number(year),
    Number(month) - 1,
    Number(day),
    now.getHours(),
    now.getMinutes(),
    now.getSeconds(),
  );

  // Cria array de oficiais (pode ter segundo oficial opcional)
  const officers = [
    {
      id: crypto.randomUUID(),
      name: data.officer.name,
      registration: data.officer.registration,
    },
  ];

  // Adiciona segundo oficial se existir
  if (data.officer.secondName && data.officer.secondRegistration) {
    officers.push({
      id: crypto.randomUUID(),
      name: data.officer.secondName,
      registration: data.officer.secondRegistration,
    });
  }

  return {
    id: crypto.randomUUID(),
    type: 'request',
    date: dateWithTime.toISOString(),
    officers,
    materials: data.materials.map((mat) => ({
      id: crypto.randomUUID(),
      name: mat.name,
      code: mat.code,
      unit: mat.unit,
      quantity: mat.quantity,
    })),
  };
}

/**
 * Salva um novo lançamento de requisição no localStorage
 */
export function saveRequestLaunch(launch: MaterialRequest): void {
  try {
    const launches = getRequestLaunches();
    launches.push(launch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(launches));
  } catch (error) {
    console.error('Erro ao salvar requisição de material:', error);
    throw new Error('Falha ao salvar dados');
  }
}

/**
 * Salva requisição a partir dos dados do formulário
 * @returns A requisição criada
 */
export function saveRequestFromForm(data: RequestFormData): MaterialRequest {
  const launch = createRequestLaunchFromFormData(data);
  saveRequestLaunch(launch);
  return launch;
}

