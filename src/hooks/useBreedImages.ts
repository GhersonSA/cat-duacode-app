import { useInfiniteQuery } from '@tanstack/react-query';
import { imagesApi } from '@/api';

export const useBreedImages = (breedId: string) =>
  useInfiniteQuery({
    queryKey: ['breedImages', breedId],
    queryFn: ({ pageParam = 0 }) => imagesApi.getByBreed(breedId, pageParam, 10),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length : undefined,
    enabled: !!breedId,
  });
