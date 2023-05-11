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
import WithCompetenceContext from './WithCompetenceContext';
import SettingsScreen from '../screens/Settings';
import ChangeLanguageScreen from '../screens/Settings/ChangeLanguage';
import {useTranslation} from 'react-i18next';
import TeacherCreateScreen from '../screens/Home/CreateTeacher';
import TeacherCreatedScreen from '../screens/Home/CreateTeacher/TeacherCreated';
import SessionViewerScreen from '../screens/TeacherView/Tabs/Session/SessionViewer';
import ObservationViewScreen from '../screens/TeacherView/Tabs/Session/SessionViewer/Observation';

const Stack = createNativeStackNavigator();

const AppRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {user} = useContext(UserContext);
  const {t} = useTranslation();

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
              name={Routes.setupUserData.schoolSelect}
              component={SchoolSelectScreen}
              options={{
                header: () => <Header hideBack />,
                headerShown: true,
                contentStyle: {backgroundColor: 'white'},
              }}
            />

            <Stack.Screen
              name={Routes.setupUserData.profileSelect}
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
            name={Routes.teacher.teacher}
            component={TeacherView}
            options={{
              header: () => <Header title={t('header.teacher') || 'Teacher'} />,
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.teacher.create}
            component={TeacherCreateScreen}
            options={{
              header: () => (
                <Header
                  title={t('header.newTeacher') || 'New teacher'}
                  hideConfig
                />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.teacher.created}
            component={TeacherCreatedScreen}
            options={{
              header: () => (
                <Header
                  title={t('header.newTeacher') || 'New teacher'}
                  hideConfig
                  hideBack
                />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.teacher.sessionViewer}
            component={SessionViewerScreen}
            options={{
              header: () => (
                <Header
                  title={t('header.previousSession') || 'Previous session'}
                  hideConfig
                />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.teacher.observationViewer}
            component={ObservationViewScreen}
            options={{
              header: () => (
                <Header
                  title={
                    t('header.observationSummary') || 'Observation summary'
                  }
                  hideConfig
                />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.settings.settings}
            component={SettingsScreen}
            options={{
              header: () => (
                <Header title={t('header.settings') || 'Settings'} hideConfig />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.settings.changeLanguage}
            component={ChangeLanguageScreen}
            options={{
              header: () => (
                <Header title={t('header.settings') || 'Settings'} hideConfig />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name="WithCompetenceContext"
            component={WithCompetenceContext}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRoutes;
