import { View, Image, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  onLogoPress: () => void;
}

export const Header = ({ onLogoPress }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="h-30 bg-white items-center justify-center border-b border-brand-light"
      style={{ paddingTop: insets.top }}
    >
      <Pressable onPress={onLogoPress} hitSlop={8}>
        <Image
          source={require('@assets/duacat-logo-2.webp')}
          className="w-28 h-20"
          resizeMode="contain"
        />
      </Pressable>
    </View>
  );
};
