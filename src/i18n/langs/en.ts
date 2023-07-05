const enTranslation = {
  common: {
    'load-more': 'Load more',
    search: 'Search',
    'image-picker': {
      'upload-image-modal-title': 'Upload as image',
      'upload-image-modal-description':
        'Choose the way you want do send the picture',
      'take-photo-button': 'Take photo',
      'photo-gallery-button': 'Photo gallery',
    },
  },

  splash: {},

  login: {
    'login-button': 'Login',
    'create-account': 'Create account',
    username: 'Username',
    password: 'Password',
    loginError: 'Login error',
    invalidUserPassword: 'Incorrect username or password',
    createAccount: {
      title: 'New account',
      takePhoto: 'Take/Choose photo',
      name: 'First name',
      surname: 'Last name',
      username: 'Username',
      password: 'Password',
      'confirm-password': 'Confirm password',
      'create-account-button': 'Create account',
      success: 'Account created successfully',
    },
  },

  settings: {
    title: 'Settings',
    logout: 'Start over',
    'logout-description': 'Start from the beginning ',
    language: 'Language',
    lastSync: 'Last sync: {{value}}',
    appVersion: 'App version',
    sync_now: 'Sync now',
    'unsynced-items': 'Unsynchronized items',
    'unsynced-teacher': 'Teachers:',
    'unsynced-session': 'Sessions:',
    'unsynced-feedback': 'Feedback:',
    'sync-error-title': 'Unable to sync',
    'sync-error-description': 'Check your connection and try again',
    changeLanguage: {
      title: 'Select language',
      button: 'Next',
    },
  },

  schoolSelect: {
    title: 'Select your school',
    search: 'Search',
    'item-description_interval':
      '(0)[No teachers here];(1)[1 teacher here];(2-inf)[{{count}} teachers here];',
  },

  home: {
    teachersLength_interval:
      '(0)[No teachers];(1)[1 teacher being coached];(2-inf)[{{count}} teachers being coached];',
    'menu-items': {
      newSession: 'Start a new session',
      switchSchools: 'Switch schools',
      switchProfile: 'Switch to a different coach profile',
      offlineSync: 'Offline sync',
      statics: 'Statistics',
      pendingSession: 'Feedback needed',
    },
    teachers: {
      title: 'Teachers',
      addNew: 'Add new teacher',
      'no-session': 'No sessions yet. Start coaching!',
      'last-session': 'Last session on {{date}}',
      session_interval: '(1)[1 Observation];(2-inf)[{{count}} Observations];',
    },
    emptyState: {
      title: 'No teacher registered',
      description: 'Add a new teacher to start coaching',
    },
    newSession: {
      title: 'Start new session',
      subtitle: 'Select a teacher and start a new observation session',
    },
    stats: {
      title: 'Check teacher stats',
      subtitle: 'Select a teacher to see their progress',
    },
  },

  teacher: {
    form: {
      name: 'Name',
      surname: 'Last name',
      emis_number: 'EMIS number',
      'title-new': 'New teacher',
      'title-edit': 'Edit teacher',
      subject: 'Principal subject',
      'new-teacher-button': 'Add teacher',
      'update-teacher-button': 'Edit teacher',
      success: 'Teacher created successfully',
    },

    details: {
      editTeacher: 'Edit teacher',
      description: '{{subject}} teacher at {{school}}',
    },

    tabs: {
      session: {
        title: 'Observation sessions',
        session: 'Observation session',
        newClassObservation: 'New class observation',
        stillNoSession: 'There are no observation sessions recorded',
        stillNoSessionDescription:
          'You may start a new class observation with this teacher',
        pendingFeedback: 'Pending observation feedback',
        haventDone:
          'You have not completed the feedback for the previous observation with this teacher',
        startFeedback: 'Start feedback now',
        selectCoach: 'Select coaching part',
        viewSummary:
          'You can view the summary of the observation or the feedback you gave to the teacher',
        feedback: {
          title: 'Feedback session summary',
          subtitle: 'Feedback provided to the teacher',
          actions:
            'These actions to improve teaching practice are agreed on between the teacher and coach',
          image: 'Image uploaded',
          imageDescription: 'Check supporting image',
        },
      },
      stats: {
        title: 'Teacher observation stats',
        editTeacher: 'Edit teacher',
        overallRating: 'Overall rating',
        currentRating: 'The current rating is:',
        ratingAverage:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        evolution:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        comparisio: "Changes in the teacher's ratings over coaching sessions",
        lastSession: 'since last session',
        seeDetails: 'See details',
        button: 'New class observation',
        empty: {
          title: 'No data are available to show now',
          subtitle:
            'Complete class observations and feedback sessions to show statistics',
          button: 'New class observation',
        },
        scale: {
          high: 'Improved',
          low: 'Needs work',
        },
        ratingPerSession: 'Rating per session',
        teacherComparision:
          "Changes in the teacher's improvement over coaching sessions",
        sessionName: 'Session',
        teacherAt: 'Teacher at {{school}}',
      },
    },
  },

  classObservation: {
    title: 'Class observation',

    about: {
      title: 'Coaching process',
      'start-button': 'Start preparation',
      step1: {
        title: 'Preparation',
        subtitle: '5 minutes',
        description:
          'Talk to the teacher before the class and review your notes if you already had a coach observation before.',
      },
      step2: {
        title: 'Classroom observation',
        subtitle: '30-45 minutes',
        description:
          'Sit at the back of the class to make notes and remember to put your phone in silent mode.',
      },
      step3: {
        title: 'Coaching conversation',
        subtitle: '20-30 minutes',
        description:
          'Present your observations to the teacher, pointing out the positive and areas of improvement points of their class.',
      },
      step4: {
        title: 'Next steps',
        subtitle: '5 minutes',
        description:
          'After agreeing with the teacher about priority next steps, schedule your next visit.',
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
            'Make sure to contact the teacher and should be let them knows you are going to observe the class and have a coaching session.',
        },
        $2: {
          title: 'Note the time',
          subtitle:
            'Plan to spend 60 to 75 minutes with the teacher. Use this time to observe their class and to conduct the coaching session.',
        },
        $3: {
          title: 'Take notes',
          subtitle:
            'Notes will help you to respond to the observation questions and plan the future coaching sessions.',
        },
      },
    },

    setup: {
      title: 'About the lesson',
      subtitle: 'Ask the teacher the following questions',
      description: 'Ask the teacher the following questions',
      button: 'Next',
      questions: {
        $0: {
          title: 'Classroom consists of',
          placeholder: 'Both',
        },
        $1: {
          title: 'How many students are in the class?',
          placeholder: 'e.g. 7',
          options: {
            $1: 'Only boys',
            $2: 'Only girls',
            $3: 'Both',
          },
        },
        $2: {
          title: 'What is the subject?',
          placeholder: 'Math',
          options: {
            $1: 'Arabic',
            $2: 'Creative and Performing Arts',
            $3: 'General Science',
            $4: 'Home economics',
            $5: 'Language Art',
            $6: 'Mathematics',
            $7: 'PHE',
            $8: 'Quantitative and Verbal Aptitude',
            $9: 'Social Studies/Civics',
          },
        },
        $3: {
          title: 'How long will the lesson last?',
          placeholder: '30 min',
        },
        $4: {
          title: 'What are the lesson’s objectives?',
          placeholder: "Teacher's description of what is to be taught",
        },
      },
    },

    form: {
      title: 'Class Observation',
      subtitle: 'Score each teaching practice related to your observation',
      keyPoints: 'Key points to be discussed',
      pointsToDiscuss: 'What you want to discuss with the teacher?',
      spaceAdditional:
        "Use this space for additional notes of items that you'd like to discuss with the teacher",
      competenciesRated: '{{count}} of {{total}} competencies rated',
      'keyPoints-placeholder': 'Positive and negative points',
      button: 'Complete observation',
    },

    formConfirmation: {
      button: 'Confirm',
      buttonEdit: 'Edit',
      competenceView: {
        title: 'Class observation summary',
        subtitle: 'Review your class observation',
        overallRating: 'Overall observation rating',
      },
    },

    observationCompleted: {
      title: 'Class observation complete',
      subtitle: 'Thank you. The class observation section is complete!',
      whatsNext: "What's next?",
      startFeedback:
        'You can start entering your feedback to the teacher  now or you can go back to the home and do it later by selecting the teacher profile',
      button: 'Provide feedback',
      buttonBack: 'Go back to home',
    },
  },

  feedback: {
    mentoringSection: {
      title: 'Best practices',
      subtitle:
        'Remember the good practices from your training and put them in practice.',
      bestPratices:
        'If you do not recall the best practices, refer to the Coach manual',
      continueButton: 'Continue to feedback session',
      trainingButton: 'Access Coach manual',
    },
    preparation: {
      title: 'Choose teaching practices',
      subtitle: 'Choose 1 teaching practice to work on with the teacher',
      teachingPratice: 'Teaching practice {{index}}',
      button: 'Complete coaching session',
    },
    form: {
      title: 'Agree on actions',
      subtitle:
        'Agree with the teacher which actions they will take to improve this teaching practice',
      actionsToImprove: 'Actions for improvement',
      describeActions:
        'Describe the actions you and the teacher agreed they will take to improve in regard to this teaching practice',
      textAreaPlaceholder:
        'e.g., become more aware of the way they speak with students',
      uploadImage: 'Upload an image',
      sendPicture:
        'You can also send a picture of the notes you made during the class observation and coaching session',
      uploadPhoto: 'Upload a photo',
      button: 'Complete coach session',
      optional: 'Optional',
    },
    completed: {
      title: 'Coaching session complete',
      subtitle: 'Thank you! You jut completed the coaching process.',
      aboutNext: "What's next?",
      aboutNextDescription:
        "Stay prepared for Teaching Learning Circles, until then you can create new observations with a teacher by selecting them at the app's home",
      button: 'Go back to home',
    },
  },

  sessionDetails: {
    title: 'Previous session',
  },

  feedbackSession: {
    title: 'Coaching session',
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
