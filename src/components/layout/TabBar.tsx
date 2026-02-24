import { View, Pressable } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/utils/constants';

const TABS = [
  { name: 'Favorites', icon: 'heart', iconOutline: 'heart-outline', color: '#EF4444' },
  { name: 'Cats', icon: 'paw', iconOutline: 'paw-outline', color: COLORS.brand.DEFAULT },
  { name: 'About', icon: 'person-circle', iconOutline: 'person-circle-outline', color: COLORS.brand.DEFAULT },
] as const;

export const TabBar = ({ state, navigation }: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="relative h-30 bg-white border-t border-brand-light flex-row items-center justify-evenly"
      style={{ paddingBottom: insets.bottom }}
    >
      {TABS.map((tab, index) => {
        const isFocused = state.index === index;
        const isCenter = tab.name === 'Cats';

        if (isCenter) {
          return (
            <Pressable
              key={tab.name}
              onPress={() => navigation.navigate(tab.name)}
              className="w-20 h-20 rounded-full items-center justify-center"
              style={{
                backgroundColor: isFocused ? COLORS.brand.DEFAULT : COLORS.brand.light,
                marginTop: -28,
              }}
              hitSlop={8}
            >
              <Ionicons
                name="paw"
                size={40}
                color={isFocused ? '#FFFFFF' : COLORS.text.muted}
              />
            </Pressable>
          );
        }

        return (
          <Pressable
            key={tab.name}
            onPress={() => navigation.navigate(tab.name)}
            className="my-2 items-center justify-center p-3"
            hitSlop={8}
          >
            <Ionicons
              name={isFocused ? tab.icon : tab.iconOutline}
              size={28}
              color={isFocused ? tab.color : COLORS.text.muted}
            />
          </Pressable>
        );
      })}
    </View>
  );
};
