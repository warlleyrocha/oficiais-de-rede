const BASE_URL = import.meta.env.VITE_API_URL;

async function get<T>(path: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export const apiClient = { get };
