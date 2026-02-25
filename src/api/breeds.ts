import { apiClient } from './client';
import type { Breed } from '@/types';

export const breedsApi = {
  getAll: async (): Promise<Breed[]> => {
    const { data } = await apiClient.get<Breed[]>('/breeds');
    return data;
  },

  getById: async (id: string): Promise<Breed> => {
    const { data } = await apiClient.get<Breed>(`/breeds/${id}`);
    return data;
  },
};
