import { create } from 'zustand';
import { votesApi } from '@/api';

export interface VotedImage {
  imageId: string;
  imageUrl: string;
  breedId: string;
  breedName: string;
  voteId: number;
  value: 1 | -1;
}

interface VotesState {
  votes: Record<string, VotedImage>;
  isVoting: boolean;

  vote: (imageId: string, imageUrl: string, breedId: string, breedName: string, value: 1 | -1) => Promise<void>;
  removeVote: (imageId: string) => Promise<void>;
  getVote: (imageId: string) => VotedImage | undefined;
  getLikedImages: () => VotedImage[];
}

export const useVotesStore = create<VotesState>((set, get) => ({
  votes: {},
  isVoting: false,

  vote: async (imageId, imageUrl, breedId, breedName, value) => {
    const existing = get().votes[imageId];

    if (existing && existing.value === value) {
      await get().removeVote(imageId);
      return;
    }

    if (existing) {
      try {
        await votesApi.delete(existing.voteId);
      } catch {}
    }

    set({ isVoting: true });
    try {
      const response = await votesApi.create(imageId, value);
      set((state) => ({
        isVoting: false,
        votes: {
          ...state.votes,
          [imageId]: {
            imageId,
            imageUrl,
            breedId,
            breedName,
            voteId: response.id,
            value,
          },
        },
      }));
    } catch {
      set({ isVoting: false });
    }
  },

  removeVote: async (imageId) => {
    const existing = get().votes[imageId];
    if (!existing) return;

    set({ isVoting: true });
    try {
      await votesApi.delete(existing.voteId);
      set((state) => {
        const { [imageId]: _, ...rest } = state.votes;
        return { isVoting: false, votes: rest };
      });
    } catch {
      set({ isVoting: false });
    }
  },

  getVote: (imageId) => get().votes[imageId],

  getLikedImages: () =>
    Object.values(get().votes).filter((v) => v.value === 1),
}));
