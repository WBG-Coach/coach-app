import React, {useEffect} from 'react';
import ChangeLanguageScreen from '../screens/Settings/ChangeLanguage';
import {Route, Routes, useNavigate} from 'react-router-native';
import {useCoachContext} from '../providers/coach.provider';
import CreateAccountScreen from '../screens/CreateAccount';
import SchoolSelectScreen from '../screens/SchoolSelect';
import TeacherFormScreen from '../screens/Teacher/TeacherForm';
import SettingsScreen from '../screens/Settings';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import {BackHandler} from 'react-native';
import PathRoutes from './paths';
import QuickNewSessionScreen from '../screens/Home/QuickActions/NewSession';
import TeacherDetailsScreen from '../screens/Teacher/TeacherDetails';
import ClassObservationAbout from '../screens/ClassObservation/About';
import ClassObservationSetup from '../screens/ClassObservation/Setup';
import ClassObservationForm from '../screens/ClassObservation/Form';
import ObservationFormConfirmation from '../screens/ClassObservation/FormConfirmation';

const RouterProvider: React.FC = () => {
  const navigate = useNavigate();
  const {currentCoach, currentSchool} = useCoachContext();

  useEffect(() => {
    const backAction = () => {
      navigate(-1);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [navigate]);

  useEffect(() => {
    console.log(currentCoach);
  }, [currentCoach]);

  return (
    <Routes>
      <Route path={PathRoutes.settings.main} Component={SettingsScreen} />
      <Route
        path={PathRoutes.settings.changeLanguage}
        Component={ChangeLanguageScreen}
      />
      <Route path={PathRoutes.createAccount} Component={CreateAccountScreen} />

      {!currentCoach && (
        <Route path={PathRoutes.main} Component={LoginScreen} />
      )}

      {currentCoach && !currentSchool && (
        <Route path={PathRoutes.main} Component={SchoolSelectScreen} />
      )}

      {currentCoach && currentSchool && (
        <>
          <Route path={PathRoutes.main} Component={HomeScreen} />
          <Route
            path={PathRoutes.home.newSession}
            Component={QuickNewSessionScreen}
          />
          <Route
            path={PathRoutes.teacher.details}
            Component={TeacherDetailsScreen}
          />
          <Route path={PathRoutes.teacher.form} Component={TeacherFormScreen} />
          <Route
            path={PathRoutes.classObservation.about}
            Component={ClassObservationAbout}
          />
          {/* <Route
            path={PathRoutes.classObservation.onboarding}
            Component={ClassObservationOnboarding}
          /> */}
          <Route
            path={PathRoutes.classObservation.setup}
            Component={ClassObservationSetup}
          />
          <Route
            path={PathRoutes.classObservation.form}
            Component={ClassObservationForm}
          />
          <Route
            path={PathRoutes.classObservation.confirmation}
            Component={ObservationFormConfirmation}
          />
        </>
      )}
    </Routes>
  );
};

export default RouterProvider;
