const Routes = {
  setupUserData: {
    schoolSelect: 'SchoolSelect',
    profileSelect: 'ProfileSelect',
  },
  home: 'HomeScreen',
  pendingSessions: 'PendingSessions',
  teacher: {
    teacher: 'TeacherScreen',
    create: 'TeacherCreateScreen',
    created: 'TeacherCreatedScreen',
    sessionViewer: 'SessionViewerScreen',
    observationViewer: 'ObservationViewerScreen',
  },
  splash: 'SplashScreen',
  settings: {
    settings: 'SettingsScreen',
    changeLanguage: 'ChangeLanguageScreen',
  },
  classObservation: {
    observationCompleted: 'ObservationCompleted',
    formConfirmaton: 'FormObservationConfirmation',
    create: 'ClassObservationCreate',
    onboarding: 'ClassOnboarding',
    setup: 'SetupObservation',
    form: 'FormObservation',
  },
  feedback: {
    mentoringSection: 'MentoringSectionScreen',
    feedbackPreparation: 'FeedbackPrepartionScreen',
    defineActions: 'DefineActionsScreen',
    feedbackCompleted: 'FeedbackCompletedScreen',
  },
};

export default Routes;
