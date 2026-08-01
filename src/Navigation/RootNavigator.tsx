import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingContainer from '../Containers/Onboarding/Container';
import LoginContainer from '../Containers/Login/Container';
import HomeContainer from '../Containers/Home/Container';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Onboarding" component={OnboardingContainer} />
      <Stack.Screen name="Login" component={LoginContainer} />
      <Stack.Screen name="Home" component={HomeContainer} />
    </Stack.Navigator>
  );
}