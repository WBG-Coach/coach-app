const PathRoutes = {
  main: '/',

  createAccount: '/createAccount',

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
    details: '/teacher/:id',
    form: '/teacher/form/:id',
  },

  classObservation: {
    about: '/classObservation/about/:teacherId',
    onboarding: '/classObservation/onboarding',
    setup: '/classObservation/setup',
    form: '/classObservation/forms',
    confirmation: '/classObservation/confirmation',
    completed: '/classObservation/completed',
  },
};

export default PathRoutes;
