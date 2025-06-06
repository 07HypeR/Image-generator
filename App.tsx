import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screens/HomeScreen';
import DiscoverScreen from './src/screens/DiscoverScreen';
import LikeScreen from './src/screens/LikeScreen';
import {colors} from './src/theme';
import Feather from 'react-native-vector-icons/Feather';
import {LikeImageProvider} from './src/context/LikeImageContext';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const Tab = createBottomTabNavigator();
const adUnitId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-4774721843718064/9892059622';

export default function App() {
  return (
    <>
      <LikeImageProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarStyle: {backgroundColor: colors.primary},
              tabBarActiveTintColor: colors.activeTabColor,
              tabBarInactiveTintColor: colors.inactiveTabColor,
              tabBarShowLabel: false,
            }}>
            <Tab.Screen
              name="HOME_SCREEN"
              component={HomeScreen}
              options={{
                tabBarIcon: ({color, size, focused}) => (
                  <Feather name={'home'} color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="DISCOVER_SCREEN"
              component={DiscoverScreen}
              options={{
                tabBarIcon: ({color, size, focused}) => (
                  <Feather name={'globe'} color={color} size={size} />
                ),
              }}
            />
            <Tab.Screen
              name="LIKE_SCREEN"
              component={LikeScreen}
              options={{
                tabBarIcon: ({color, size, focused}) => (
                  <Feather name={'heart'} color={color} size={size} />
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </LikeImageProvider>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
      />
    </>
  );
}
