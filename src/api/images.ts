import { apiClient } from './client';
import type { CatImage } from '@/types';

export const imagesApi = {
  getByBreed: async (breedId: string, page: number = 0, limit: number = 10): Promise<CatImage[]> => {
    const { data } = await apiClient.get<CatImage[]>('/images/search', {
      params: {
        breed_ids: breedId,
        limit,
        page,
        order: 'ASC',
      },
    });
    return data;
  },
};
