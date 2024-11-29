import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ROUTES from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import AddClothingScreen from '../screens/AddClothingScreen';
import AddOutfitScreen from '../screens/AddOutfitScreen';
import ViewClothingScreen from '../screens/ViewClothingScreen';
import BrowseClothingScreen from '../screens/BrowseClothingScreen';

const Stack = createNativeStackNavigator();

const ClothingStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.BROWSE_CLOTHING_SCREEN}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen
        name={ROUTES.BROWSE_CLOTHING_SCREEN}
        component={BrowseClothingScreen}
      />
      <Stack.Screen
        name={ROUTES.VIEW_CLOTHING_SCREEN}
        component={ViewClothingScreen}
      />
    </Stack.Navigator>
  );
};

export default ClothingStack;
