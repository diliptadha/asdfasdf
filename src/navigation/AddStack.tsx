import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ROUTES from '../constants/routes';
import HomeScreen from '../screens/HomeScreen';
import AddClothingScreen from '../screens/AddClothingScreen';
import AddOutfitScreen from '../screens/AddOutfitScreen';

const Stack = createNativeStackNavigator();

const AddStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ADD_STACK}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen
        name={ROUTES.ADD_CLOTHING_SCREEN}
        component={AddClothingScreen}
      />
      <Stack.Screen
        name={ROUTES.ADD_OUTFIT_SCREEN}
        component={AddOutfitScreen}
      />
    </Stack.Navigator>
  );
};

export default AddStack;
