import { apiClient } from '@/services/api/client';
import type { MaterialApi } from '@/types/api/materiais';

export function getMateriais(): Promise<MaterialApi[]> {
  return apiClient.get<MaterialApi[]>('/materiais');
}
