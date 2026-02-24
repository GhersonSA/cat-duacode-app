import { View, ActivityIndicator } from 'react-native';

interface LoadingScreenProps {
  color?: string;
}

export const LoadingScreen = ({ color = '#8B5CF6' }: LoadingScreenProps) => (
  <View className="flex-1 bg-white items-center justify-center">
    <ActivityIndicator size="large" color={color} />
  </View>
);
