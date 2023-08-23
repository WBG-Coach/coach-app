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
import {VStack} from 'native-base';
import AccountCreatedScreen from '../screens/AccountCreated';
import PendingSessionsScreen from '../screens/Home/QuickActions/Pending';
import TLCOnboarding from '../screens/TeacherLearningCircles/Onboarding';
import TLCCheckingStats from '../screens/TeacherLearningCircles/CheckingStats';
import TLCUnitSelect from '../screens/TeacherLearningCircles/UnitSelect';
import TLCIntroduction from '../screens/TeacherLearningCircles/Introduction';
import TLCSituations from '../screens/TeacherLearningCircles/Situations';
import TLCExplanation from '../screens/TeacherLearningCircles/Explanation';
import TLCFinish from '../screens/TeacherLearningCircles/Finish';
import TLCActivities from '../screens/TeacherLearningCircles/Activities';
import AboutScan from '../screens/AboutScan';
import CoachSelectScreen from '../screens/CoachSelect';
import SyncDetails from '../screens/SyncDetails';

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

        {!currentSchool && (
          <>
            <Route path={PathRoutes.main} Component={AboutScan} />
            <Route
              path={PathRoutes.selectSchool}
              Component={SchoolSelectScreen}
            />
          </>
        )}

        {currentSchool && !currentCoach && (
          <>
            <Route path={PathRoutes.main} Component={CoachSelectScreen} />
            <Route
              path={PathRoutes.createAccount}
              Component={CreateAccountScreen}
            />
            <Route path={PathRoutes.syncDetails} Component={SyncDetails} />
          </>
        )}

        {currentCoach && currentSchool && (
          <>
            <Route path={PathRoutes.main} Component={HomeScreen} />
            <Route
              path={PathRoutes.accountCreated}
              Component={AccountCreatedScreen}
            />

            <Route
              path={PathRoutes.home.newSession}
              Component={QuickNewSessionScreen}
            />
            <Route
              path={PathRoutes.home.pendingSessions}
              Component={PendingSessionsScreen}
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
            <Route
              path={PathRoutes.teacherLearningCircles.onboarding}
              Component={TLCOnboarding}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.checkingStats}
              Component={TLCCheckingStats}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.unitSelect}
              Component={TLCUnitSelect}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.introduction}
              Component={TLCIntroduction}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.situations}
              Component={TLCSituations}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.explanation}
              Component={TLCExplanation}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.activities}
              Component={TLCActivities}
            />
            <Route
              path={PathRoutes.teacherLearningCircles.finish}
              Component={TLCFinish}
            />
          </>
        )}
      </Routes>
    </VStack>
  );
};

export default RouterProvider;
