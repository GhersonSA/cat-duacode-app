import { useCallback, useMemo, useRef, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  Pressable,
  useWindowDimensions,
  ActivityIndicator,
  Animated,
  ViewToken,
  LayoutChangeEvent,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontFamily } from '@/hooks/useAppFonts';
import { useBreedImages } from '@/hooks/useBreedImages';
import { useVotesStore } from '@/store/votesStore';
import type { CatImage } from '@/types';

const catLike = require('@assets/cat-like.webp');
const catDislike = require('@assets/cat-dislike.webp');

const LIKE_COLOR = '#A78BFA';
const LIKE_ACTIVE = '#8B5CF6';
const DISLIKE_COLOR = '#EF4444';
const DISLIKE_ACTIVE = '#DC2626';

interface BreedDetailScreenProps {
  breedId: string;
  breedName: string;
  initialImageId?: string;
  onClose: () => void;
}

const ImageItem = ({
  item,
  width,
  height,
  breedId,
  breedName,
}: {
  item: CatImage;
  width: number;
  height: number;
  breedId: string;
  breedName: string;
}) => {
  const vote = useVotesStore((s) => s.votes[item.id]);
  const doVote = useVotesStore((s) => s.vote);
  const [likeScale] = useState(new Animated.Value(1));
  const [dislikeScale] = useState(new Animated.Value(1));

  const isHorizontal = item.width > item.height;

  const animateButton = (scale: Animated.Value) => {
    Animated.sequence([
      Animated.spring(scale, { toValue: 1.3, useNativeDriver: true, speed: 50 }),
      Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 50 }),
    ]).start();
  };

  const handleLike = () => {
    animateButton(likeScale);
    doVote(item.id, item.url, breedId, breedName, 1);
  };

  const handleDislike = () => {
    animateButton(dislikeScale);
    doVote(item.id, item.url, breedId, breedName, -1);
  };

  const isLiked = vote?.value === 1;
  const isDisliked = vote?.value === -1;

  return (
    <View style={{ width, height }} className="relative bg-black">
      {isHorizontal ? (
        <>
          {/* Blur bg */}
          <Image
            source={{ uri: item.url }}
            style={{ width, height, position: 'absolute' }}
            resizeMode="cover"
            blurRadius={25} />
          <View className="absolute inset-0 bg-black/40" />

          <View className="flex-1 items-center justify-center">
            <Image
              source={{ uri: item.url }}
              style={{
                width: width,
                height: width * (item.height / item.width),
              }}
              resizeMode="contain" />
          </View>
        </>
      ) : (
        <Image
          source={{ uri: item.url }}
          style={{ width, height }}
          resizeMode="cover" />
      )}

      {/* Like/Dislike */}
      <View
        className="absolute right-5 items-center gap-4"
        style={{ bottom: 24 }} >
        <Animated.View style={{ transform: [{ scale: likeScale }] }}>
          <Pressable
            onPress={handleLike}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isLiked ? LIKE_ACTIVE : 'rgba(0,0,0,0.35)',
              borderWidth: 2.5,
              borderColor: isLiked ? LIKE_ACTIVE : LIKE_COLOR,
              shadowColor: isLiked ? LIKE_ACTIVE : '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isLiked ? 0.6 : 0.3,
              shadowRadius: isLiked ? 10 : 4,
              elevation: 8,
            }} >
            <Image source={catLike} style={{ width: 36, height: 36 }} resizeMode="contain" />
          </Pressable>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: dislikeScale }] }}>
          <Pressable
            onPress={handleDislike}
            style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isDisliked ? DISLIKE_ACTIVE : 'rgba(0,0,0,0.35)',
              borderWidth: 2.5,
              borderColor: isDisliked ? DISLIKE_ACTIVE : DISLIKE_COLOR,
              shadowColor: isDisliked ? DISLIKE_ACTIVE : '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: isDisliked ? 0.6 : 0.3,
              shadowRadius: isDisliked ? 10 : 4,
              elevation: 8,
            }} >
            <Image source={catDislike} style={{ width: 36, height: 36 }} resizeMode="contain" />
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
};

export const BreedDetailScreen = ({ breedId, breedName, initialImageId, onClose }: BreedDetailScreenProps) => {
  const { width } = useWindowDimensions();
  const [containerHeight, setContainerHeight] = useState(0);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    const h = e.nativeEvent.layout.height;
    if (h > 0) setContainerHeight(h);
  }, []);

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useBreedImages(breedId);

  const images = data?.pages.flat() ?? [];

  const initialIndex = useMemo(() => {
    if (!initialImageId || images.length === 0) return 0;
    const idx = images.findIndex((img) => img.id === initialImageId);
    return idx >= 0 ? idx : 0;
  }, [initialImageId, images]);

  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setCurrentIndex(viewableItems[0].index);
      }
    },
  ).current;

  const viewabilityConfig = useRef({ itemVisiblePercentThreshold: 50 }).current;

  const onEndReached = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <View className="flex-1 bg-black" onLayout={onLayout}>
      {isLoading || containerHeight === 0 ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#8B5CF6" />
          <Text
            className="text-white mt-4 text-base"
            style={{ fontFamily: FontFamily.medium }} >
            Cargando imágenes...
          </Text>
        </View>
      ) : images.length === 0 ? (
        <View className="flex-1 items-center justify-center px-6">
          <Text
            className="text-white text-lg text-center"
            style={{ fontFamily: FontFamily.medium }} >
            No hay imágenes disponibles para esta raza
          </Text>
        </View>
      ) : (
        <FlatList<CatImage>
          data={images}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ImageItem
              item={item}
              width={width}
              height={containerHeight}
              breedId={breedId}
              breedName={breedName} />
          )}
          pagingEnabled
          showsVerticalScrollIndicator={false}
          snapToInterval={containerHeight}
          snapToAlignment="start"
          decelerationRate="fast"
          getItemLayout={(_, index) => ({
            length: containerHeight,
            offset: containerHeight * index,
            index,
          })}
          initialScrollIndex={initialIndex}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={viewabilityConfig} />
      )}

      <Pressable
        onPress={onClose}
        className="absolute items-center justify-center rounded-full bg-black/40"
        style={{
          top: 12,
          left: 16,
          width: 40,
          height: 40,
        }} >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </Pressable>

      <View
        className="absolute rounded-full bg-black/40 px-4 py-1.5"
        style={{ top: 14, alignSelf: 'center' }} >
        <Text
          className="text-white text-sm"
          style={{ fontFamily: FontFamily.semibold }} >
          {breedName}
        </Text>
      </View>

      {/* Image */}
      {images.length > 0 && (
        <View
          className="absolute rounded-full bg-black/40 px-3 py-1"
          style={{ top: 14, right: 16 }} >
          <Text
            className="text-white text-xs"
            style={{ fontFamily: FontFamily.medium }} >
            {currentIndex + 1} / {images.length}
          </Text>
        </View>
      )}

      {isFetchingNextPage && (
        <View className="absolute bottom-4 self-center">
          <ActivityIndicator size="small" color="#8B5CF6" />
        </View>
      )}
    </View>
  );
};
