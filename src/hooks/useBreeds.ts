import { useQuery } from '@tanstack/react-query';
import { breedsApi } from '@/api';

export const useBreeds = () =>
  useQuery({
    queryKey: ['breeds'],
    queryFn: breedsApi.getAll,
  });
