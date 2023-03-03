import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './paths';
import SplashScreen from '../screens/Splash';
import Header from '../components/Header';
import ProfileSelectScreen from '../screens/ProfileSelect';
import SchoolSelectScreen from '../screens/SchoolSelect';
import {navigationRef} from '../services/navigation';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={Routes.splash}
        screenOptions={{header: Header}}>
        {isLoading && (
          <Stack.Screen
            name={Routes.splash}
            component={SplashScreen}
            options={{
              headerShown: false,
              contentStyle: {backgroundColor: 'white'},
            }}
          />
        )}
        <Stack.Screen
          name={Routes.setupUserData.SchoolSelect}
          component={SchoolSelectScreen}
          options={{
            headerShown: true,
            contentStyle: {backgroundColor: 'white'},
          }}
        />
        <Stack.Screen
          name={Routes.setupUserData.ProfileSelect}
          component={ProfileSelectScreen}
          options={{
            headerShown: true,
            contentStyle: {backgroundColor: 'white'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
