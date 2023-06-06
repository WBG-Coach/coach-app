const enTranslation = {
  setupUserData: {
    schoolSelect: {
      title: 'Select the school',
      lineDesc: 'Teachers here',
      emptyList: 'No schools for this filter',
    },
    profileSelect: {
      title: 'Select your profile',
      lineDesc: 'Coaching $val teachers',
    },
  },
  home: {
    items: {
      newSession: 'Start new session',
      switchSchools: 'Switch schools',
      offlineSync: 'Offline sync',
      statics: 'Statistics',
      pendingSession: 'Pending sessions',
    },
    teachersLength: '$teacherslength Teachers being coached',
    noTeachersLength: 'No teachers',
    teachers: {
      title: 'Teachers',
      session: 'Session',
      sessions: 'Sessions',
      addNew: 'Add new teacher',
    },
  },
  teacher: {
    description: '$name teacher at $school',
    tabs: {
      session: {
        title: 'Sessions',
        session: 'Session',
        newClassObservation: 'New class observation',
        stillNoSession: 'Still no session',
        stillNoSessionDescription:
          'You can start a new class observation with this teacher',
      },
      stats: {
        title: "Teacher's stats",
      },
    },
  },
  splash: {},
  settings: {
    settings: {},
    changeLanguage: {},
  },
  classObservation: {
    observationCompleted: {},
    formConfirmaton: {},
    create: {
      title: 'Mentoring process',
      button: 'Start preparation',
      process: {
        el1: {
          title: 'Preparation',
          subtitle: '5min',
          description:
            'Talk to the teacher before the class and review your notes if you already had a coach observation before.',
        },
        el2: {
          title: 'Classroom observation',
          subtitle: '30-45min',
          description:
            'Sit at the back of the class to make notes and remember to put your phone in silent mode.',
        },
        el3: {
          title: 'Coaching conversation',
          subtitle: '20-30min',
          description:
            'Present to the teacher your observations, pointing the positive and negative points of their class.',
        },
        el4: {
          title: 'Next steps',
          subtitle: '5min',
          description:
            'After agreeing with the teacher about the  key next steps, schedule the next visit.',
        },
      },
    },
    onboarding: {
      skip: 'Skip',
      start: 'Start',
      next: 'Next',
      sections: {
        $1: {
          title: 'Inform the teacher',
          subtitle:
            "Make sure to contact the teacher and let they know you're going to observe the class and have a mentoring session",
        },
        $2: {
          title: 'Beware of the time',
          subtitle:
            'Plan to spend 60 to 75 minutes with the teacher. Use this time to observe their class and to have the mentoring session',
        },
        $3: {
          title: 'Make notes',
          subtitle:
            'The notes will help you to answer the observation questions and plan the future mentoring sessions',
        },
      },
    },
    setup: {
      title: 'About the lesson',
      subtitle: 'Ask the teacher the following questions',
      description: 'Ask the teacher the following questions',
      button: 'Next',

      questions: {
        $1: {
          title: 'How many students are boys?',
          placeholder: '15',
        },
        $2: {
          title: 'How many students are girls?',
          placeholder: '15',
        },
        $3: {
          title: "What's the subject?",
          placeholder: 'Math',
        },
        $4: {
          title: 'How long the lesson’s going to last?',
          placeholder: '30 min',
        },
        $5: {
          title: "Teacher's description of the class",
          placeholder: "Teacher's description of the class",
        },
      },
    },
    form: {},
  },
  feedback: {
    mentoringSection: {},
    feedbackPreparation: {},
    defineActions: {},
    feedbackCompleted: {},
  },
  header: {
    settings: 'Settings',
    newsession: 'New session',
    teacher: 'Teacher',
    newTeacher: 'New teacher',
    newClassObservation: 'New class observation',
    preparation: 'Preparation',
    classObservation: 'Class Observation',
    observationSummary: 'Observation summary',
    observationComplete: 'Observation complete',
    mentoringSession: 'Mentoring session',
    feedbackPreparation: 'Feedback preparation',
    feedbackComplete: 'Feedback complete',
    previousSession: 'Previous session',
    pendingSession: 'Pending sessions',
    teacherstats: 'Teacher stats',
  },
  components: {
    starsTag: {
      notEvaluted: 'Not evaluated',
      needsWork: 'Needs work',
      needsAttention: 'Needs attention',
      almostThere: 'Almost there',
      doingGreat: 'Doing great',
    },
  },
};

export default enTranslation;
