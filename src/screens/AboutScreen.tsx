import { View, Text } from 'react-native';
import { FontFamily } from '@/hooks/useAppFonts';

export const AboutScreen = () => (
  <View className="flex-1 bg-white items-center justify-center px-6">
    <Text
      className="text-2xl text-text-main"
      style={{ fontFamily: FontFamily.bold }}
    >
      About
    </Text>
  </View>
);
