// services/storage/materialLaunchStorage.ts
import type { FormData } from '@/types/formMaterial';
import type { MaterialLaunch } from '@/types/history';

const STORAGE_KEY = 'material-launches';

/**
 * Recupera todos os lançamentos de baixa de material do localStorage
 */
export function getMaterialLaunches(): MaterialLaunch[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao recuperar lançamentos de material:', error);
    return [];
  }
}

/**
 * Converte dados do formulário para o formato MaterialLaunch
 */
export function createMaterialLaunchFromFormData(data: FormData): MaterialLaunch {
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

  return {
    id: crypto.randomUUID(),
    type: 'material',
    date: dateWithTime.toISOString(),
    activity: data.officer.activity,
    city: data.officer.city,
    street: data.officer.street,
    number: data.officer.number,
    hood: data.officer.hood,
    officers: [
      {
        id: crypto.randomUUID(),
        name: data.officer.name,
        registration: data.officer.registration,
      },
    ],
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
 * Salva um novo lançamento de material no localStorage
 */
export function saveMaterialLaunch(launch: MaterialLaunch): void {
  try {
    const launches = getMaterialLaunches();
    launches.push(launch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(launches));
  } catch (error) {
    console.error('Erro ao salvar lançamento de material:', error);
    throw new Error('Falha ao salvar dados');
  }
}

/**
 * Salva lançamento a partir dos dados do formulário
 * @returns O lançamento criado
 */
export function saveLaunchFromForm(data: FormData): MaterialLaunch {
  const launch = createMaterialLaunchFromFormData(data);
  saveMaterialLaunch(launch);
  return launch;
}

// Mantém compatibilidade com código antigo
export { getMaterialLaunches as getLaunches };
export type { MaterialLaunch as Launch } from '@/types/history';
