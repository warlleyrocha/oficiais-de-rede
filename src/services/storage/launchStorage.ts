import type { FormData } from '../../types/formMaterial';

// Tipo específico para Launch armazenado
export interface Launch {
  id: string;
  date: string;
  activity: string | undefined;
  city: string;
  street: string;
  number: string | undefined;
  officers: Array<{
    id: string;
    name: string | undefined;
    registration: string | undefined;
  }>;
  materials: Array<{
    id: string;
    name: string;
    code?: string;
    unit: string;
    quantity: number;
  }>;
}

const STORAGE_KEY = 'launches';

/**
 * Recupera todos os launches do localStorage
 */
export function getLaunches(): Launch[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao recuperar launches:', error);
    return [];
  }
}

/**
 * Converte dados do formulário para o formato Launch
 */
export function createLaunchFromFormData(data: FormData): Launch {
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
    date: dateWithTime.toISOString(), // ISO com hora
    activity: data.officer.activity,
    city: data.officer.city,
    street: data.officer.street,
    number: data.officer.number,
    officers: [
      {
        id: crypto.randomUUID(),
        name: data.officer.name,
        registration: data.officer.registration,
      },
    ],
    materials: data.materials.map((mat) => ({
      id: crypto.randomUUID(),
      ...mat, // unit e quantity permanecem intactos
    })),
  };
}

/**
 * Salva um novo launch no localStorage
 */
export function saveLaunch(launch: Launch): void {
  try {
    const launches = getLaunches();
    launches.push(launch);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(launches));
  } catch (error) {
    console.error('Erro ao salvar launch:', error);
    throw new Error('Falha ao salvar dados');
  }
}

/**
 * Salva launch a partir dos dados do formulário
 * @returns O launch criado
 */
export function saveLaunchFromForm(data: FormData): Launch {
  const launch = createLaunchFromFormData(data);
  saveLaunch(launch);
  return launch;
}
