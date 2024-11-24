const BASE_URL = "https://pokeapi.co/api/v2";

export const restClient = {
  get: async <T>(endpoint: string) => {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<T>;
  },
};
