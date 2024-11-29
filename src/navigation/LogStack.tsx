import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ROUTES from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import LogOutfitScreen from '../screens/LogOutfitScreen';
import AddLogOutfitScreen from '../screens/AddLogOutfitScreen';

const Stack = createNativeStackNavigator();

const LogStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.LOG_OUTFIT_SCREEN}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen
        name={ROUTES.LOG_OUTFIT_SCREEN}
        component={LogOutfitScreen}
      />
      <Stack.Screen
        name={ROUTES.ADD_LOG_OUTFIT_SCREEN}
        component={AddLogOutfitScreen}
      />
    </Stack.Navigator>
  );
};

export default LogStack;
