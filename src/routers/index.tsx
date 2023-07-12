import React from 'react';
import ChangeLanguageScreen from '../screens/Settings/ChangeLanguage';
import {Route, Routes} from 'react-router-native';
import {useCoachContext} from '../providers/coach.provider';
import CreateAccountScreen from '../screens/CreateAccount';
import SchoolSelectScreen from '../screens/SchoolSelect';
import TeacherFormScreen from '../screens/Teacher/TeacherForm';
import SettingsScreen from '../screens/Settings';
import LoginScreen from '../screens/Login';
import HomeScreen from '../screens/Home';
import PathRoutes from './paths';
import QuickNewSessionScreen from '../screens/Home/QuickActions/NewSession';
import TeacherDetailsScreen from '../screens/Teacher/TeacherDetails';
import ClassObservationAbout from '../screens/ClassObservation/About';
import ClassObservationSetup from '../screens/ClassObservation/Setup';
import ClassObservationForm from '../screens/ClassObservation/Form';
import ClassObservationConfirmation from '../screens/ClassObservation/Confirmation';
import ClassObservationCompleted from '../screens/ClassObservation/Completed';
import SessionDetailsScreen from '../screens/SessionDetails';
import FeedbackSessionAbout from '../screens/FeedbackSession/About';
import FeedbackSessionChooseCompetence from '../screens/FeedbackSession/ChooseCompetence';
import FeedbackSessionForm from '../screens/FeedbackSession/Form';
import FeedbackSessionCompleted from '../screens/FeedbackSession/Completed';
import FeedbackDetailScreen from '../screens/SessionDetails/FeedbackDetails';
import ClassObservationDetailsScreen from '../screens/SessionDetails/ClassObservationDetails';
import CompetenceStats from '../screens/Teacher/TeacherDetails/Tabs/TeacherStats/CompetenceStats';
import QuickStatsScreen from '../screens/Home/QuickActions/Stats';
import {Container, VStack} from 'native-base';
import AccountCreatedScreen from '../screens/AccountCreated';

const RouterProvider: React.FC = () => {
  const {currentCoach, currentSchool} = useCoachContext();

  return (
    <VStack bg="white" flex={1} w="full">
      <Routes>
        <Route path={PathRoutes.settings.main} Component={SettingsScreen} />
        <Route
          path={PathRoutes.settings.changeLanguage}
          Component={ChangeLanguageScreen}
        />
        <Route
          path={PathRoutes.createAccount}
          Component={CreateAccountScreen}
        />

        {!currentCoach && (
          <Route path={PathRoutes.main} Component={LoginScreen} />
        )}

        {currentCoach && !currentSchool && (
          <>
            <Route path={PathRoutes.main} Component={SchoolSelectScreen} />
            <Route
              path={PathRoutes.accountCreated}
              Component={AccountCreatedScreen}
            />
          </>
        )}

        {currentCoach && currentSchool && (
          <>
            <Route path={PathRoutes.main} Component={HomeScreen} />
            <Route
              path={PathRoutes.home.newSession}
              Component={QuickNewSessionScreen}
            />
            <Route path={PathRoutes.home.stats} Component={QuickStatsScreen} />
            <Route
              path={PathRoutes.teacher.details}
              Component={TeacherDetailsScreen}
            />
            <Route
              path={PathRoutes.teacher.competenceStats}
              Component={CompetenceStats}
            />
            <Route
              path={PathRoutes.teacher.form}
              Component={TeacherFormScreen}
            />
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
              Component={ClassObservationConfirmation}
            />
            <Route
              path={PathRoutes.classObservation.completed}
              Component={ClassObservationCompleted}
            />
            <Route
              path={PathRoutes.session.details}
              Component={SessionDetailsScreen}
            />
            <Route
              path={PathRoutes.session.classObservation}
              Component={ClassObservationDetailsScreen}
            />
            <Route
              path={PathRoutes.session.feedback}
              Component={FeedbackDetailScreen}
            />
            <Route
              path={PathRoutes.feedbackSession.about}
              Component={FeedbackSessionAbout}
            />
            <Route
              path={PathRoutes.feedbackSession.chooseCompetence}
              Component={FeedbackSessionChooseCompetence}
            />
            <Route
              path={PathRoutes.feedbackSession.form}
              Component={FeedbackSessionForm}
            />
            <Route
              path={PathRoutes.feedbackSession.completed}
              Component={FeedbackSessionCompleted}
            />
          </>
        )}
      </Routes>
    </VStack>
  );
};

export default RouterProvider;
