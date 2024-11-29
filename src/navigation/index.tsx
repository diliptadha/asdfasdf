import * as React from 'react';

import {Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ROUTES from '../constants/routes';
import BottomTabBar from './BottomTab';
import AuthStack from './AuthStack';
import SplashScreen from '../screens/SplashScreen';

const Stack = createNativeStackNavigator();

function Navigation() {
  return (
    <NavigationContainer
      fallback={<Text style={{color: 'black'}}>Loading...</Text>}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name={ROUTES.SPLASH_SCREEN} component={SplashScreen} />
        <Stack.Screen name={ROUTES.HOME_STACK} component={BottomTabBar} />
        <Stack.Screen name={ROUTES.AUTH_STACK} component={AuthStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
