import React from 'react';
import {VStack} from 'native-base';
import {Route, Routes} from 'react-router-native';
import ChangeLanguageScreen from '../screens/Settings/ChangeLanguage';
import CoachFormScreen from '../screens/CoachForm';
import SchoolSelectScreen from '../screens/SchoolSelect';
import TeacherFormScreen from '../screens/Teacher/TeacherForm';
import SettingsScreen from '../screens/Settings';
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
import FeedbackSessionChooseAnswer from '../screens/FeedbackSession/ChooseAnswer';
import FeedbackSessionForm from '../screens/FeedbackSession/Form';
import FeedbackSessionCompleted from '../screens/FeedbackSession/Completed';
import FeedbackDetailScreen from '../screens/SessionDetails/FeedbackDetails';
import ClassObservationDetailsScreen from '../screens/SessionDetails/ClassObservationDetails';
import CompetenceStats from '../screens/Teacher/TeacherDetails/Tabs/TeacherStats/CompetenceStats';
import QuickStatsScreen from '../screens/Home/QuickActions/Stats';
import CoachCreatedScreen from '../screens/CoachCreated';
import PendingSessionsScreen from '../screens/Home/QuickActions/Pending';
import TLCOnboarding from '../screens/TeacherLearningCircles/Onboarding';
import TLCCheckingStats from '../screens/TeacherLearningCircles/CheckingStats';
import TLCUnitSelect from '../screens/TeacherLearningCircles/UnitSelect';
import TLCIntroduction from '../screens/TeacherLearningCircles/Introduction';
import TLCFinish from '../screens/TeacherLearningCircles/Finish';
import CoachSelectScreen from '../screens/CoachSelect';
import SyncDetails from '../screens/SyncDetails';
import TLCDynamicStep from '../screens/TeacherLearningCircles/DynamicStep';
import SplashScreen from '../screens/SplashScreen';
import CoachScriptsScreen from '../screens/CoachScripts';
import COPOnboarding from '../screens/CommunityOfPractice/Onboarding';
import COPCheckingStats from '../screens/CommunityOfPractice/CheckingStats';
import COPExercise from '../screens/CommunityOfPractice/Exercise';
import COPFinish from '../screens/CommunityOfPractice/Finish';
import LoginScreen from '../screens/Login/Main';
import OTPScreen from '../screens/Login/OTP';
import SignupScreen from '../screens/SignUp/Main';
import SignupSuccessScreen from '../screens/SignUp/Success';

const RouterProvider: React.FC = () => {
  return (
    <VStack bg="white" flex={1} w="full">
      <Routes>
        <Route path={PathRoutes.splash} Component={SplashScreen} />

        <Route path={PathRoutes.settings.main} Component={SettingsScreen} />

        <Route
          path={PathRoutes.settings.changeLanguage}
          Component={ChangeLanguageScreen}
        />

        <Route path={PathRoutes.login.main} Component={LoginScreen} />

        <Route path={PathRoutes.login.otp} Component={OTPScreen} />

        <Route path={PathRoutes.signup.main} Component={SignupScreen} />

        <Route
          path={PathRoutes.signup.success}
          Component={SignupSuccessScreen}
        />

        <Route path={PathRoutes.selectSchool} Component={SchoolSelectScreen} />

        <Route path={PathRoutes.coachScripts} Component={CoachScriptsScreen} />

        <Route path={PathRoutes.syncDetails} Component={SyncDetails} />

        <Route path={PathRoutes.selectAccount} Component={CoachSelectScreen} />

        <Route path={PathRoutes.createAccount} Component={CoachFormScreen} />

        <Route path={PathRoutes.home.main} Component={HomeScreen} />

        <Route
          path={PathRoutes.accountCreated}
          Component={CoachCreatedScreen}
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

        <Route path={PathRoutes.teacher.form} Component={TeacherFormScreen} />

        <Route
          path={PathRoutes.classObservation.about}
          Component={ClassObservationAbout}
        />
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
          Component={FeedbackSessionChooseAnswer}
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
          Component={TLCDynamicStep}
        />
        <Route
          path={PathRoutes.teacherLearningCircles.explanation}
          Component={TLCDynamicStep}
        />
        <Route
          path={PathRoutes.teacherLearningCircles.activities}
          Component={TLCDynamicStep}
        />
        <Route
          path={PathRoutes.teacherLearningCircles.finish}
          Component={TLCFinish}
        />
        <Route
          path={PathRoutes.communityOfPractice.onboarding}
          Component={COPOnboarding}
        />
        <Route
          path={PathRoutes.communityOfPractice.checkingStats}
          Component={COPCheckingStats}
        />
        <Route
          path={PathRoutes.communityOfPractice.insights}
          Component={e => <COPExercise type={'insights'} {...e} />}
        />
        <Route
          path={PathRoutes.communityOfPractice.positives}
          Component={e => <COPExercise type={'positives'} {...e} />}
        />
        <Route
          path={PathRoutes.communityOfPractice.improvements}
          Component={e => <COPExercise type={'improvements'} {...e} />}
        />
        <Route
          path={PathRoutes.communityOfPractice.next_steps}
          Component={e => <COPExercise type={'next_steps'} {...e} />}
        />
        <Route
          path={PathRoutes.communityOfPractice.finish}
          Component={COPFinish}
        />
      </Routes>
    </VStack>
  );
};

export default RouterProvider;
