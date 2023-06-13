const enTranslation = {
  noGeolocation: {
    title: 'Location service not allowed',
    description:
      'We need access to your location to provide a great Coach experience',
    allowButton: 'Allow location service',
  },
  setupUserData: {
    schoolSelect: {
      title: 'Select the school',
      lineDesc: '{{count}} Teachers here',
      emptyList: 'No schools for this filter',
    },
    profileSelect: {
      title: 'Select your profile',
      lineDesc: 'Coaching {{count}} teachers',
      emptyList: 'No profiles for this filter',
      create: {
        title: 'Create new profile',
        takePhoto: 'Take/choose photo',
        name: 'First name',
        surname: 'Last name',
        emis: 'EMIS number',
        optional: 'Optional',
        button: 'Add profile',
      },
      created: {
        title: 'Profile created',
        subtitle:
          'Now you can select your profile and start coaching the teachers',
        button: 'Go to profile selection',
      },
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
    teachersLength_interval:
      '(0)[No teachers];(1)[1 Teacher being coached];(2-inf)[{{count}} Teachers being coached];',
    teachers: {
      title: 'Teachers',
      session_interval: '(1)[1 Session];(2-inf)[{{count}} Sessions]',
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
        pendingFeedback: 'Pending feedback session',
        haventDone:
          "You still haven't done the feedback of the last class observation with this teacher",
        startFeedback: 'Start feedback now',
        selectCoach: 'Select coaching part',
        viewSummary:
          'You can view the summary of the observation or the feedback you had with the teacher',
        feedback: {
          title: 'Feedback session summary',
          subtitle: 'Check how was the conversation with the teacher',
          actions:
            "Those are the actions you and the teacher agreed they're going to take to improve in this teaching practice",
          image: 'Image uploaded',
          imageDescription:
            "You can check the image you've sent of you annotations",
        },
      },
      stats: {
        title: "Teacher's stats",
        editTeacher: 'Edit teacher',
        overallRating: 'Overall rating',
        currentRating: 'The current rating is:',
        ratingAverage:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        evolution:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        comparisio:
          "Comparison presenting the teacher's improvement through coach sessions",
        lastSession: 'since last session',
        seeDetails: 'See details',
        button: 'New class observation',
        empty: {
          title: 'No data to show now',
          subtitle:
            'Complete class observations and feedback sessions to show the statistics',
          button: 'New class observation',
        },
        scale: {
          high: 'Got better',
          low: 'Needs work',
        },
        ratingPerSession: 'Rating per session',
        teacherComparision:
          "Comparison presenting the teacher's improvement through coach sessions",
        sessionName: 'Session',
      },
    },
    create: {
      editTeacher: 'Edit a teacher',
      newTeacher: 'Add a new teacher',
      takePhoto: 'Take/choose photo',
      firstName: 'First name',
      lastName: 'Last name',
      emisNumber: 'EMIS number',
      principalSubject: 'Principal subject',
      principalSubjectPlaceholder: 'e.g. Math',
      dateOfBirth: 'Date of birth',
      buttonSave: 'Save',
      buttonAdd: 'Add teacher',
    },
    created: {
      title: 'New teacher added',
      subtitle:
        'The teacher will be available in the list of teachers at the home of the app',
      startCoaching: 'Start coaching this teacher',
      selectProfile:
        'Select their profile and click the ”New class observation” button to get started',
      button: 'Finish',
    },
  },
  splash: {},
  settings: {
    settings: {
      title: 'Language',
      lastSync: 'Last sync:',
      appVersion: 'App version',
    },
    changeLanguage: {
      title: 'Select language',
      button: 'Next',
    },
  },
  classObservation: {
    observationCompleted: {
      title: 'Class observation complete',
      subtitle:
        'Congratulations, you just completed the class evaluation process!',
      whatsNext: "What's next?",
      startFeedback:
        'You can start the feedback with the teacher right now or you can go back to the home and do it later by selecting the teacher profile',
      button: 'Start feedback preparation',
      buttonBack: 'Go back to home',
    },
    formConfirmation: {
      button: 'Finish observation',
      buttonEdit: 'Edit evaluation',
      competenceView: {
        title: 'Class observation summary',
        subtitle: 'Review how you rated the class',
        overallRating: 'Overall rating',
      },
    },
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
          title: 'How many students are in the class?',
          placeholder: 'e.g. 7',
        },
        $2: {
          title: 'What is the subject?',
          placeholder: 'Math',
        },
        $3: {
          title: 'How long will the lesson last?',
          placeholder: '30 min',
        },
        $4: {
          title: "What are the teacher's objectives?",
          placeholder: "Teacher's description of the teaching",
        },
      },
    },
    form: {
      title: 'Class evaluation',
      subtitle: 'Rate each topic with your observation',
      keyPoints: 'Key points to be discussed',
      pointsToDiscuss: 'What you want to discuss with the teacher?',
      spaceAdditional:
        "Use this space for additional annotations that you'd like to discuss with the teacher",
      competenciesRated: '{{count}} of {{total}} competencies rated',
      button: 'Finish observation',
    },
  },
  feedback: {
    mentoringSection: {
      title: 'Best practices',
      subtitle:
        'Remember the good practices from your training and put them in practice.',
      bestPratices:
        "If you don't remember the best practices access the Training Guide",
      continueButton: 'Continue to feedback preparation',
      trainingButton: 'Access Training Guide',
    },
    feedbackPreparation: {
      title: 'Choose teaching practices',
      subtitle: 'Choose 1 teaching practices to work with the teacher',
      teachingPratice: 'Teaching practice 2',
      button: 'Finish coach session',
    },
    defineActions: {
      title: 'Define the actions',
      subtitle:
        'Define with the teacher what actions they will take to improve this teaching practice',
      actionsToImprove: 'Actions to improve',
      describeActions:
        "Describe the actions you and the teacher agreed they're going to take to improve in this teaching practice",
      textAreaPlaceholder:
        'e.g. Be more aware of the way they talk to students',
      uploadImage: 'Upload a image',
      sendPicture:
        'You can also send a picture of the annotations you made during the class observation and mentoring session',
      uploadPhoto: 'Upload a photo',
      button: 'Finish coach session',
    },
    feedbackCompleted: {
      title: 'Feedback complete',
      subtitle: 'Congratulations, you just completed the coaching process!',
      aboutNext: "What's next?",
      aboutNextDescription:
        "Stay prepared for Teaching Learning Circles, until then you can create new observations with a teacher by selecting them at the app's home",
      button: 'Go back to home',
    },
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
  quickAccess: {
    newSession: {
      title: 'Start new session',
      subtitle: 'Select a teacher and start a new observation session',
    },
    stats: {
      title: 'Check teacher stats',
      subtitle: 'Select a teacher to see their progress',
    },
  },
};

export default enTranslation;
