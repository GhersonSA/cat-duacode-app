import { useRef } from 'react';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { Header } from '@/components/layout';
import { TabBar } from '@/components/layout';
import { CatsScreen } from '@/screens/CatsScreen';
import { FavoritesScreen } from '@/screens/FavoritesScreen';
import { AboutScreen } from '@/screens/AboutScreen';

export type RootTabParamList = {
  Favorites: undefined;
  Cats: undefined;
  About: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export const AppNavigator = () => {
  const navigationRef = useRef<NavigationContainerRef<RootTabParamList>>(null);

  return (
    <NavigationContainer ref={navigationRef}>
      <View className="flex-1 bg-white">
        <Header
          onLogoPress={() => navigationRef.current?.navigate('Cats')}
        />
        <Tab.Navigator
          initialRouteName="Cats"
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <TabBar {...props} />}
        >
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Cats" component={CatsScreen} />
          <Tab.Screen name="About" component={AboutScreen} />
        </Tab.Navigator>
      </View>
    </NavigationContainer>
  );
};
