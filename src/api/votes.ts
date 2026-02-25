import { apiClient } from './client';
import type { Vote, VoteResponse } from '@/types';

export const votesApi = {
  getAll: async (): Promise<Vote[]> => {
    const { data } = await apiClient.get<Vote[]>('/votes', {
      params: { limit: 100, order: 'DESC' },
    });
    return data;
  },

  create: async (imageId: string, value: 1 | -1): Promise<VoteResponse> => {
    const { data } = await apiClient.post<VoteResponse>('/votes', {
      image_id: imageId,
      sub_id: 'duacat-user',
      value,
    });
    return data;
  },

  delete: async (voteId: number): Promise<void> => {
    await apiClient.delete(`/votes/${voteId}`);
  },
};
