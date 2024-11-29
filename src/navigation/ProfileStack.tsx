import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ROUTES from '../constants/routes';
import ProfileScreen from '../screens/ProfileScreen';
import UpdateScreen from '../screens/UpdateScreen';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.PROFILE_SCREEN}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen name={ROUTES.PROFILE_SCREEN} component={ProfileScreen} />
      <Stack.Screen name={ROUTES.UPDATE_SCREEN} component={UpdateScreen} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
