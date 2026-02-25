import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';

interface SkeletonProps {
  width: number;
  height: number;
  borderRadius?: number;
  className?: string;
}

export const Skeleton = ({ width, height, borderRadius = 8, className }: SkeletonProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <Animated.View
      className={className}
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: '#E2E8F0',
        opacity,
      }}
    />
  );
};
