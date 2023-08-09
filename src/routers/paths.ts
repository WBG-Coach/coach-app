const PathRoutes = {
  main: '/',

  createAccount: '/createAccount',

  accountCreated: '/accountCreated',

  settings: {
    main: '/settings',
    changeLanguage: '/settings/changeLanguage',
  },

  home: {
    pendingSessions: '/pendingSessions',
    newSession: '/quickNewSessionScreen',
    stats: '/quickStatsScreen',
  },

  teacher: {
    details: '/teacher/:id/:tabIndex?',
    form: '/teacher/form/:id',
    competenceStats: '/teacher/competences/:competence_index/:id',
  },

  teacherLearningCircles: {
    onboarding: '/teacherlearningcircles/onboarding',
  },

  classObservation: {
    about: '/classObservation/about/:teacherId',
    onboarding: '/classObservation/onboarding',
    setup: '/classObservation/setup',
    form: '/classObservation/forms',
    confirmation: '/classObservation/confirmation',
    completed: '/classObservation/completed/:sessionId',
  },

  session: {
    details: '/session/details',
    classObservation: '/session/class-observation',
    feedback: '/session/feedback',
  },

  feedbackSession: {
    about: '/feedbackSession/about/:sessionId',
    chooseCompetence: '/feedbackSession/chooseCompetence',
    form: '/feedbackSession/form',
    completed: '/feedbackSession/completed',
  },
};

export default PathRoutes;
