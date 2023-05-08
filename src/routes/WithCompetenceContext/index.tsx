import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTranslation} from 'react-i18next';
import Header from '../../components/Header';
import CompetenceContextProvider from '../../providers/contexts/CompetencesContext';
import ClassObservationCreate from '../../screens/ClassObservation/Create';
import ObservationForm from '../../screens/ClassObservation/Form';
import FormConfirmation from '../../screens/ClassObservation/FormConfirmation';
import ObservationCompleted from '../../screens/ClassObservation/ObservationCompleted';
import ClassOnboarding from '../../screens/ClassObservation/Onboarding';
import ObservationSetup from '../../screens/ClassObservation/Setup';
import DefineActions from '../../screens/Feedback/DefineActions';
import FeedbackCompleted from '../../screens/Feedback/FeedbackCompleted';
import FeedbackPreparation from '../../screens/Feedback/FeedbackPreparation';
import MentoringSection from '../../screens/Feedback/MentoringSession';
import Routes from '../paths';
const Stack = createNativeStackNavigator();

export default function WithCompetenceContext() {
  const {t} = useTranslation();

  return (
    <CompetenceContextProvider>
      <Stack.Navigator initialRouteName={Routes.classObservation.create}>
        <Stack.Group>
          <Stack.Screen
            name={Routes.classObservation.create}
            component={ClassObservationCreate}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={
                    t('header.newClassObservation') || 'New class observation'
                  }
                />
              ),
              headerShown: true,
              contentStyle: {backgroundColor: 'white'},
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.onboarding}
            component={ClassOnboarding}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={t('header.preparation') || 'Preparation'}
                  background={'primary.0'}
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.setup}
            component={ObservationSetup}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={t('header.classObservation') || 'Class Observation'}
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.form}
            component={ObservationForm}
            options={{
              header: () => (
                <Header
                  background="gray.0"
                  hideConfig
                  title={t('header.classObservation') || 'Class Observation'}
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.formConfirmaton}
            component={FormConfirmation}
            options={{
              header: () => (
                <Header
                  background="gray.0"
                  hideConfig
                  title={
                    t('header.observationSummary') || 'Observation summary'
                  }
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.classObservation.observationCompleted}
            component={ObservationCompleted}
            options={{
              header: () => (
                <Header
                  background="gray.0"
                  hideConfig
                  hideBack
                  title={
                    t('header.observationComplete') || 'Observation complete'
                  }
                />
              ),
              headerShown: true,
            }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name={Routes.feedback.mentoringSection}
            component={MentoringSection}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={t('header.mentoringSession') || 'Mentoring session'}
                  background={'primary.0'}
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.feedback.feedbackPreparation}
            component={FeedbackPreparation}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={
                    t('header.feedbackPreparation') || 'Feedback preparation'
                  }
                  background="gray.0"
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.feedback.defineActions}
            component={DefineActions}
            options={{
              header: () => (
                <Header
                  hideConfig
                  title={
                    t('header.feedbackPreparation') || 'Feedback preparation'
                  }
                  background="gray.0"
                />
              ),
              headerShown: true,
            }}
          />

          <Stack.Screen
            name={Routes.feedback.feedbackCompleted}
            component={FeedbackCompleted}
            options={{
              header: () => (
                <Header
                  hideBack
                  hideConfig
                  title={t('header.feedbackComplete') || 'Feedback complete'}
                  background="gray.0"
                />
              ),
              headerShown: true,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </CompetenceContextProvider>
  );
}
