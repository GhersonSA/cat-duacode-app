import { useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '@/hooks/useAppFonts';
import { useBreeds } from '@/hooks/useBreeds';
import { Skeleton } from '@/components/ui/Skeleton';
import { SearchBar } from '@/components/ui/SearchBar';
import { COLORS } from '@/utils/constants';
import { BreedDetailScreen } from '@/screens/BreedDetailScreen';
import type { Breed } from '@/types';

type SortOrder = 'none' | 'asc' | 'desc';

const shuffleArray = <T,>(arr: T[], seed: number[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = seed[i % seed.length] % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getAvgLifespan = (lifeSpan: string): number => {
  const nums = lifeSpan.match(/\d+/g);
  if (!nums) return 0;
  return nums.reduce((sum, n) => sum + Number(n), 0) / nums.length;
};

const BreedCard = ({ breed, width, onPress }: { breed: Breed; width: number; onPress: () => void }) => {
  return (
    <View style={{ width }} className="px-5 py-3">
      <Pressable onPress={onPress} className="bg-white rounded-3xl overflow-hidden border border-brand-light">
        {breed.image?.url ? (
          <Image
            source={{ uri: breed.image.url }}
            className="w-full h-56"
            resizeMode="cover" />
        ) : (
          <View className="w-full h-56 bg-surface items-center justify-center">
            <Text className="text-text-muted text-sm">Sin imagen</Text>
          </View>
        )}

        <View className="px-5 pt-4 pb-4">
          <Text
            className="text-xl text-text-main mb-1"
            style={{ fontFamily: FontFamily.bold }}
            numberOfLines={1} >
            {breed.name}
          </Text>

          <Text
            className="text-sm text-brand mb-2"
            style={{ fontFamily: FontFamily.medium }} >
            {breed.origin}
          </Text>

          <Text
            className="text-sm text-text-muted leading-5 mb-2"
            style={{ fontFamily: FontFamily.regular }} >
            {breed.description}
          </Text>

          <View className="flex-row flex-wrap gap-1 mt-1 mb-2">
            {breed.temperament?.split(',').slice(0, 4).map((t) => (
              <View key={t.trim()} className="bg-brand-light rounded-full px-3 py-1">
                <Text
                  className="text-xs text-brand-dark"
                  style={{ fontFamily: FontFamily.medium }} >
                  {t.trim()}
                </Text>
              </View>
            ))}
          </View>

          <View className="flex-row justify-between mt-2">
            <Text className="text-xs text-text-muted" style={{ fontFamily: FontFamily.regular }}>
              Vida: {breed.life_span} años
            </Text>
            <Text className="text-xs text-text-muted" style={{ fontFamily: FontFamily.regular }}>
              Peso: {breed.weight.metric} kg
            </Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

const BreedCardSkeleton = ({ width }: { width: number }) => (
  <View style={{ width }} className="px-5 py-3">
    <View className="bg-white rounded-3xl overflow-hidden border border-brand-light">
      <Skeleton width={width - 40} height={192} borderRadius={0} />
      <View className="px-5 pt-4">
        <Skeleton width={180} height={24} borderRadius={8} />
        <View className="mt-2">
          <Skeleton width={100} height={16} borderRadius={6} />
        </View>
        <View className="mt-3">
          <Skeleton width={width - 80} height={14} borderRadius={4} />
        </View>
        <View className="mt-2">
          <Skeleton width={width - 100} height={14} borderRadius={4} />
        </View>
        <View className="mt-2">
          <Skeleton width={width - 120} height={14} borderRadius={4} />
        </View>
        <View className="flex-row gap-2 mt-3">
          <Skeleton width={70} height={24} borderRadius={12} />
          <Skeleton width={80} height={24} borderRadius={12} />
          <Skeleton width={60} height={24} borderRadius={12} />
        </View>
      </View>
    </View>
  </View>
);

export const CatsScreen = () => {
  const { width } = useWindowDimensions();
  const { data: breeds, isLoading, isError } = useBreeds();
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('none');
  const [selectedBreed, setSelectedBreed] = useState<Breed | null>(null);
  const listRef = useRef<FlatList<Breed>>(null);
  const shuffleSeed = useRef(
    Array.from({ length: 100 }, () => Math.floor(Math.random() * 1000)),
  ).current;

  useEffect(() => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  }, [sortOrder]);

  const filtered = useMemo(() => {
    if (!breeds) return [];
    let result = breeds;

    if (search.trim()) {
      const q = search.toLowerCase().trim();
      result = result.filter(
        (b) => b.name.toLowerCase().includes(q) || b.origin.toLowerCase().includes(q),
      );
    }

    if (sortOrder === 'asc') {
      result = [...result].sort((a, b) => getAvgLifespan(a.life_span) - getAvgLifespan(b.life_span));
    } else if (sortOrder === 'desc') {
      result = [...result].sort((a, b) => getAvgLifespan(b.life_span) - getAvgLifespan(a.life_span));
    } else {
      result = shuffleArray(result, shuffleSeed);
    }

    return result;
  }, [breeds, search, sortOrder, shuffleSeed]);

  if (isLoading) {
    return (
      <View className="flex-1 bg-surface">
        <View className="mx-5 mt-3 mb-2">
          <View className="bg-white rounded-2xl border border-brand-light h-14" />
        </View>
        <View className="flex-row mx-5 gap-2 mb-2">
          <Skeleton width={(width - 48) / 2} height={40} borderRadius={12} />
          <Skeleton width={(width - 48) / 2} height={40} borderRadius={12} />
        </View>
        <View className="flex-1">
          <BreedCardSkeleton width={width} />
        </View>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 bg-surface items-center justify-center px-6">
        <Text
          className="text-lg text-text-muted text-center"
          style={{ fontFamily: FontFamily.medium }}
        >
          No se pudieron cargar las razas
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <View className="mx-5 my-3">
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por nombre o país..." />
      </View>

      <View className="flex-row mx-5 gap-2 mb-2">
        <Pressable
          onPress={() => setSortOrder((prev) => (prev === 'asc' ? 'none' : 'asc'))}
          className={`flex-1 flex-row items-center justify-center gap-2 h-10 rounded-xl ${
            sortOrder === 'asc' ? 'bg-brand' : 'bg-white border border-brand-light'
          }`} >
          <Ionicons
            name="arrow-down-outline"
            size={16}
            color={sortOrder === 'asc' ? '#fff' : COLORS.brand.DEFAULT} />
          <Text
            className={`text-sm ${sortOrder === 'asc' ? 'text-white' : 'text-text-main'}`}
            style={{ fontFamily: FontFamily.semibold }} >
            Menos edad
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSortOrder((prev) => (prev === 'desc' ? 'none' : 'desc'))}
          className={`flex-1 flex-row items-center justify-center gap-2 h-10 rounded-xl ${
            sortOrder === 'desc' ? 'bg-brand' : 'bg-white border border-brand-light'
          }`} >
          <Ionicons
            name="arrow-up-outline"
            size={16}
            color={sortOrder === 'desc' ? '#fff' : COLORS.brand.DEFAULT} />
          <Text
            className={`text-sm ${sortOrder === 'desc' ? 'text-white' : 'text-text-main'}`}
            style={{ fontFamily: FontFamily.semibold }} >
            Más edad
          </Text>
        </Pressable>
      </View>

      {filtered.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="text-base text-text-muted text-center"
            style={{ fontFamily: FontFamily.medium }} >
            No se encontraron razas
          </Text>
        </View>
      ) : (
        <FlatList<Breed>
          ref={listRef}
          data={filtered}
          extraData={sortOrder}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToInterval={width}
          snapToAlignment="start"
          className="flex-1"
          getItemLayout={(_, index) => ({
            length: width,
            offset: width * index,
            index,
          })}
          renderItem={({ item }) => (
            <BreedCard breed={item} width={width} onPress={() => setSelectedBreed(item)} />
          )} />
      )}

      {selectedBreed && (
        <View style={StyleSheet.absoluteFill}>
          <BreedDetailScreen
            breedId={selectedBreed.id}
            breedName={selectedBreed.name}
            onClose={() => setSelectedBreed(null)} />
        </View>
      )}
    </View>
  );
};
