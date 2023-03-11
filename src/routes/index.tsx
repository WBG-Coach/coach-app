import React, {useState, useEffect, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Routes from './paths';
import SplashScreen from '../screens/Splash';
import Header from '../components/Header';
import ProfileSelectScreen from '../screens/ProfileSelect';
import SchoolSelectScreen from '../screens/SchoolSelect';
import {navigationRef} from '../services/navigation';
import {UserContext} from '../providers/contexts/UserContext';
import HomeScreen from '../screens/Home';
import TeacherView from '../screens/TeacherView';
import ClassObservationCreate from '../screens/ClassObservation/Create';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(UserContext);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={Routes.splash}>
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

        {!user && (
          <Stack.Group>
            <Stack.Screen
              name={Routes.setupUserData.SchoolSelect}
              component={SchoolSelectScreen}
              options={{
                header: () => <Header hideBack />,
                headerShown: true,
                contentStyle: {backgroundColor: 'white'},
              }}
            />
            <Stack.Screen
              name={Routes.setupUserData.ProfileSelect}
              component={ProfileSelectScreen}
              options={{
                header: () => <Header />,
                headerShown: true,
                contentStyle: {backgroundColor: 'white'},
              }}
            />
          </Stack.Group>
        )}

        <Stack.Group>
          <Stack.Screen
            name={Routes.home}
            component={HomeScreen}
            options={{
              header: () => <Header hideBack />,
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.teacher}
            component={TeacherView}
            options={{
              header: () => <Header title={'Teacher'} />,
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.create}
            component={ClassObservationCreate}
            options={{
              header: () => (
                <Header hideConfig title={'New class observation'} />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
