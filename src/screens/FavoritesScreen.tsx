import { useEffect, useMemo, useState } from 'react';
import { View, Text, Image, FlatList, Pressable, useWindowDimensions, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { FontFamily } from '@/hooks/useAppFonts';
import { useVotesStore, VotedImage } from '@/store/votesStore';
import { Ionicons } from '@expo/vector-icons';
import { BreedDetailScreen } from '@/screens/BreedDetailScreen';

const LIKE_ACTIVE = '#8B5CF6';

const FavoriteCard = ({
  item,
  size,
  onPress,
}: {
  item: VotedImage;
  size: number;
  onPress: () => void;
}) => {
  const removeVote = useVotesStore((s) => s.removeVote);

  return (
    <View style={{ width: size, height: size }} className="p-1.5">
      <Pressable
        onPress={onPress}
        className="flex-1 rounded-2xl overflow-hidden bg-white border border-brand-light" >
        <Image
          source={{ uri: item.imageUrl }}
          className="flex-1"
          resizeMode="cover" />

        <View className="absolute bottom-0 left-0 right-0 bg-black/40 px-3 py-2 flex-row items-center justify-between">
          <Text
            className="text-white text-xs flex-1 mr-2"
            style={{ fontFamily: FontFamily.semibold }}
            numberOfLines={1} >
            {item.breedName}
          </Text>

          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              removeVote(item.imageId);
            }}
            className="rounded-full items-center justify-center"
            style={{
              width: 32,
              height: 32,
              backgroundColor: LIKE_ACTIVE,
            }} >
            <Ionicons name="heart" size={18} color="#fff" />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
};

export const FavoritesScreen = () => {
  const { width } = useWindowDimensions();
  const votes = useVotesStore((s) => s.votes);
  const likedImages = useMemo(
    () => Object.values(votes).filter((v) => v.value === 1),
    [votes],
  );
  const numColumns = 2;
  const itemSize = (width - 20) / numColumns;

  const [selectedBreed, setSelectedBreed] = useState<{ id: string; name: string; imageId?: string } | null>(null);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isFocused && selectedBreed) {
      setSelectedBreed(null);
    }
  }, [isFocused]);

  if (likedImages.length === 0) {
    return (
      <View className="flex-1 bg-surface items-center justify-center px-6">
        <Ionicons name="heart-outline" size={64} color="#CBD5E1" />
        <Text
          className="text-lg text-text-muted text-center mt-4"
          style={{ fontFamily: FontFamily.medium }}
        >
          Aún no tienes favoritos
        </Text>
        <Text
          className="text-sm text-text-muted text-center mt-1"
          style={{ fontFamily: FontFamily.regular }} >
          Dale like a las imágenes que más te gusten
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-surface">
      <View className="mx-5 mt-4 mb-2">
        <Text
          className="text-lg text-text-main"
          style={{ fontFamily: FontFamily.bold }}
        >
          Tus favoritos ({likedImages.length})
        </Text>
      </View>

      <FlatList<VotedImage>
        data={likedImages}
        keyExtractor={(item) => item.imageId}
        numColumns={numColumns}
        contentContainerStyle={{ paddingHorizontal: 10, alignItems: 'center' }}
        columnWrapperStyle={{ justifyContent: 'flex-start' }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FavoriteCard
            item={item}
            size={itemSize}
            onPress={() => setSelectedBreed({ id: item.breedId, name: item.breedName, imageId: item.imageId })}
          />
        )}
      />

      {selectedBreed && (
        <View style={StyleSheet.absoluteFill}>
          <BreedDetailScreen
            breedId={selectedBreed.id}
            breedName={selectedBreed.name}
            initialImageId={selectedBreed.imageId}
            onClose={() => setSelectedBreed(null)}
          />
        </View>
      )}
    </View>
  );
};
