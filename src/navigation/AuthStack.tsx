import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import ROUTES from '../constants/routes';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import OnboardingScreen from '../screens/OnboardingScreen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ROUTES.ONBOARDING_SCREEN}
      screenOptions={{headerShown: false, animation: 'none'}}>
      <Stack.Screen
        name={ROUTES.ONBOARDING_SCREEN}
        component={OnboardingScreen}
      />
      <Stack.Screen name={ROUTES.LOGIN_SCREEN} component={LoginScreen} />
      <Stack.Screen name={ROUTES.SIGN_UP_SCREEN} component={SignUpScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
