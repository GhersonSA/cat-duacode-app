import './global.css';
import { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { LoadingScreen } from '@/components/ui';
import { useAppFonts, FontFamily } from '@/hooks/useAppFonts';

export default function App() {
  const fontsLoaded = useAppFonts();
  const [splashDone, setSplashDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setSplashDone(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!fontsLoaded || !splashDone) {
    return <LoadingScreen />;
  }

  return (
    <View className="flex-1 bg-white items-center justify-center px-6">
      <StatusBar style="dark" />
      <Text
        className="text-3xl text-text-main mb-2"
        style={{ fontFamily: FontFamily.bold }}
      >
        Duacat
      </Text>
      <Text
        className="text-base text-text-muted"
        style={{ fontFamily: FontFamily.regular }}
      >
        Setup inicial
      </Text>
    </View>
  );
}
