import { apiClient } from '@/services/api/client';
import type { MaterialApi } from '@/types/api/materiais';

export async function getMateriais(): Promise<MaterialApi[]> {
  const result = await apiClient.get<{ data: MaterialApi[] }>('/materiais');
  return result.data;
}
