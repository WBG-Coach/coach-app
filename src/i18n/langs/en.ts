const enTranslation = {
  errors: {requiredField: 'This field is required.'},
  common: {
    'load-more': 'Load more',
    optional: 'Optional',
    search: 'Search',
    'image-picker': {
      'upload-image-modal-title': 'Upload as image',
      'upload-image-modal-description':
        'Choose the way you want do send the picture',
      'upload-image-modal-option-title': 'Upload options',
      'upload-image-modal-option-description':
        'Choose the way you want to send the picture of your annotations',
      'take-photo-button': 'Take photo',
      'photo-gallery-button': 'Photo gallery',
    },
  },
  bottom_navigator: {
    home: 'Home',
    tlc: 'TLC',
    pending: 'Pending',
    cop: 'COP',
  },
  components: {
    starsTag: {
      notEvaluted: 'Poor',
      needsWork: 'Needs work',
      needsAttention: 'Needs attention',
      almostThere: 'Almost there',
      doingGreat: 'Doing great',
    },
  },
  aboutScan: {
    title: 'Scan the QR Code',
    description:
      "Scan the QR code in the Coach's Manual to setup your School information in the app",
    scan: 'Scan QR Code',
  },
  login: {
    main: {
      welcome: 'Welcome to Coach!',
      user_id: 'User ID',
      user_id_placeholder: 'Email ID or Phone number',
      error:
        'User not found. Try logging in using phone number or create an account.',
      button: 'Login',
      create_account: "Don't have an account?",
      create_account_button: ' Register now',
    },
    otp: {
      title: 'Enter the 4-digit code sent to you at',
      error: 'Incorrect code. Please try again.',
      button: 'Verify',
      not_receive_code: "Didn't receive a verification code?",
      resend_code: 'Resend code',
      change_email: 'Change email',
    },
    fastlogin: {
      welcome: 'Welcome back!',
      title: 'You were previously logged in as',
      button: 'Login as',
      change_coach_button: 'Change coach',
    },
    createAccount: {
      title: 'New account',
      takePhoto: 'Take/Choose photo',
      name: 'First name',
      surname: 'Last name',
      pin: 'PIN',
      pin_description: 'Personal Identification Number',
      nin: 'NIN',
      email: 'Email',
      phone: 'Phone',
      birthdate: "Coach's date of birth",
      nin_description: 'National Identification Number',
      'create-account-button': 'Create account',
      success: 'Account created successfully',
    },
    accountCreated: {
      title: 'Account created',
      subtitle: 'Now you can use your account to log in to this device',
    },
  },
  signup: {
    success: {
      title: 'Profile created',
      subtitle:
        'Now you can register your school and start coaching the teachers',
      button: 'Go to school selection',
    },
  },
  logout: {
    title: 'Are you sure you want to sign out?',
    'confirm-button': 'Yes',
    'cancel-button': 'Cancel',
  },
  settings: {
    title: 'Settings',
    logout: 'Sign out',
    'logout-description': 'Start from the beginning ',
    language: 'Language',
    lastSync: 'Last sync: {{value}}',
    appVersion: 'App version',
    'unsynced-items': 'Unsynchronized items',
    'unsynced-teacher': 'Teachers:',
    'unsynced-session': 'Sessions:',
    'unsynced-feedback': 'Feedback:',
    'sync-error-title': 'Unable to synchronize data',
    'sync-error-description': 'Check your connection and try again',
    changeLanguage: {title: 'Select language', button: 'Next'},
  },
  coachSelect: {
    title: 'Select your profile',
    'new-profile': 'Create new profile',
    'item-description_interval':
      '(0)[No sessions here];(1)[1 session here];(2-inf)[{{count}} sessions here];',
    'item-description-empty': 'No profiles here',
  },
  schoolSelect: {
    title: 'Select your school',
    'item-description_interval':
      '(0)[No teachers here];(1)[1 teacher here];(2-inf)[{{count}} teachers here];',
  },
  syncDetails: {
    title: 'Setup complete',
    description: 'The device was setup with the basic data from',
    start: 'Start using the app',
    'description-list': "You'll be able to :",

    list_0: '- Select Bayshore High in the school list',
    list_1: '- Create new teachers',
    list_2: '- Select teachers created before',
    list_3: "- View previously created teacher's data",
    list_4: '- View {{ value }} data',
  },
  home: {
    salutation: 'Hi',
    teachersLength_interval: 'You are coaching in ',
    'menu-items': {
      newSession: 'Start a new session',
      switchSchools: 'Switch schools',
      switchCoach: 'Switch coaches',
      coachScript: 'Coach script',
      pendingSession: 'Pending Sessions',
      switchProfile: 'Switch to a different coach profile',
      startOver: 'Sign out',
      statics: 'Statistics',
    },
    teachers: {
      title: 'Teachers',
      addNew: 'Add new teacher',
      'no-session': 'No sessions yet. Start coaching!',
      'last-session': 'Last session entered on {{date}}',
      session_interval: '(1)[1 Observation];(2-inf)[{{count}} Observations];',
      teachers_count: 'Teachers in this school:',
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
      page_title: 'Statistics',
      title: 'Check teacher stats',
      tabs: {
        available: 'Available statistics',
        unavailable: 'Unavailable statistics',
      },
      empty: {
        title: 'No teacher registered',
        subtitle:
          'Add a new teacher and complete 3 coaching sessions to view statistics',
      },
      available: {
        title: 'Available statistics',
        subtitle:
          'Select a teacher to view their evolution through the coaching sessions',
        empty: {
          title: 'No statistics available',
          subtitle:
            "Each teacher's statistics becomes available after three coaching sessions.",
        },
      },
      unavailable: {
        title: 'Unavailable statistics',
        subtitle:
          'You need at least 3 coaching sessions completed with those teachers to see the statistics.',
        empty: {
          title: 'All statistics are available',
          subtitle:
            'You need at least 3 coaching sessions completed with those teachers to see the statistics.',
        },
        label: '{{value}} Additional coaching sessions required',
      },
    },
    pending: {
      page_title: 'Incomplete sessions',
      title: 'Incomplete sessions',
      subtitle: 'Complete the feedback sessions with the following teachers',
      list_subtitle: 'Feedback pending',
    },
  },
  teacher: {
    form: {
      name: 'Name',
      birthdate: "Teacher's date of birth",
      birthdate_title: 'Select a date',
      birthdate_confirm: 'Confirm',
      birthdate_cancel: 'Cancel',
      teacher_code: 'Teacher code',
      teacher_code_description: 'Code of the teacher',
      surname: 'Last name',
      'title-new': 'New teacher',
      'title-edit': 'Edit teacher',
      subject: 'Principal subject',
      'new-teacher-button': 'Add teacher',
      'update-teacher-button': 'Edit teacher',
      success: 'Teacher created successfully',
      success_update: 'Teacher updated successfully',
      pin: 'PIN',
      pin_description: 'Personal Identification Number',
      nin: 'NIN',
      nin_description: 'National Identification Number',
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
        selectCoach: 'Select coaching session',
        viewSummary:
          'You may view the summary of the observation or the feedback you provided to the teacher',
      },
      stats: {
        title: "Teacher's stats",
        overallRating: 'Overall rating',
        currentRating: 'The current rating is:',
        ratingAverage:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        evolution:
          'This rating is the average of all 5 Teaching Practices in the last observation',
        comparision: "Changes in the teacher's ratings over coaching sessions",
        lastSession: 'since last session',
        seeDetails: 'See details',
        button: 'New class observation',
        empty: {
          title: 'No data are available to show now',
          subtitle:
            'Complete at least three class observations with feedback sessions to show statistics',
          button: 'New class observation',
        },
        ratingPerSession: 'Rating per session',
        teacherComparision:
          "Changes in the teacher's ratings over coaching sessions",
        sessionName: 'Session {{value}}',
        teacherAt: 'Teacher at {{school}}',
      },
    },
    subjects: {
      np: {
        $1: 'English',
        $2: 'Mathematics',
        $3: 'Science and Technology',
        $4: 'Social Studies and Human Values',
        $5: 'Health Physical and Creative Arts',
        $6: 'Mother Tongue and Local Subjects',
        $7: 'Hamro serofero',
        $8: 'Other',
      },
      sl: {
        $1: 'Arabic',
        $2: 'Creative and Performing Arts',
        $3: 'General Science',
        $4: 'Home economics',
        $5: 'Language Art',
        $6: 'Mathematics',
        $7: 'PHE',
        $8: 'Quantitative and Verbal Aptitude',
        $9: 'Social Studies/Civics',
        $10: 'Other',
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
          'Talk to the teacher before the class and review your notes on previous visits if you already had a coach observation before.',
      },
      step2: {
        title: 'Classroom observation',
        subtitle: '30-45 minutes',
        description:
          'Sit at the back of the class to take notes and remember to put your phone in silent mode.',
      },
      step3: {
        title: 'Coaching conversation',
        subtitle: '20-30 minutes',
        description:
          'Present your observations to the teacher, pointing out the positive aspects and areas of improvement for their class teaching.',
      },
      step4: {
        title: 'Next steps',
        subtitle: '5 minutes',
        description:
          'After agreeing with the teacher about priority next steps for improvement, schedule your next visit.',
      },
    },
    setup: {
      title: 'About the lesson',
      subtitle: 'Ask the teacher the following questions',
      button: 'Next',
      questions: {
        $0: {title: 'Classroom consists of', placeholder: 'Both'},
        $1: {
          title: 'How many students are in the class?',
          placeholder: 'e.g. 7',
          options: {
            $1: 'Both boys and girls',
            $2: 'Only boys',
            $3: 'Only girls',
          },
          counters: {
            $1: '1 - 10',
            $2: '10 - 30',
            $3: '30 - 60',
            $4: '60+',
          },
        },
        $2: {title: 'What is the subject?', placeholder: 'Math'},
        $3: {
          title: 'How long will the lesson last?',
          placeholder: '30 min',
          options: {
            $1: '25 mins',
            $2: '30 mins',
            $3: '35 mins',
            $4: '40 mins',
            $5: '45 mins',
            $6: '50 mins',
            $7: '55 mins',
            $8: '60 mins',
          },
        },

        $4: {
          title: 'What are the objectives of the lesson?',
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
        'Use this space for additional notes of items that you would like to discuss with the teacher',
      competenciesRated: '{{count}} of {{total}} teaching practices rated',
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
        'You may start entering your feedback to the teacher now or you can go back to the home screen and do it later by selecting the teacher profile',
      button: 'Provide feedback',
      buttonBack: 'Return to home screen',
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
        'You may also send a picture of the notes you took during the class observation and coaching session or any other interesting documentation from your observation',
      uploadPhoto: 'Upload a photo',
      button: 'Complete coach session',
    },
    completed: {
      title: 'Coaching session complete',
      subtitle: 'Thank you! You just completed the coaching process.',
      aboutNext: "What's next?",
      aboutNextDescription:
        'Stay prepared for Teaching Learning Circles, until then you may create new observations with a teacher by returning to the home screen and selecting a new teacher',
      button: 'Return to home screen',
    },
  },
  cop: {
    onboarding: {
      page_title: 'Community of Practice',
      title: 'Getting started',
      subtitle:
        'The CoP is the third step of Coach. It is conducted by the Head Teacher and can be supported by Lead Teachers. ',
      description:
        'Check out the Community of Practice (CoP) steps and start a new session:',
      button: 'Start Community of Practice',

      process: {
        $1: {
          title: 'Set a agenda',
          subtitle: '',
          description: 'Schedule a meeting with all teachers of the school.',
        },
        $2: {
          title: 'Check stats',
          subtitle: '5min',
          description:
            'View the summary of the statistics of the observations. Each coach will have different statistics once they are based on the observations.',
        },
        $3: {
          title: 'Sharing insights',
          subtitle: '10-20min',
          description: 'Share insights from the observations',
        },
        $4: {
          title: 'Discuss positives',
          subtitle: '10-20min',
          description:
            'Discuss the Teaching Practices that had highlights during evaluations.',
        },
        $5: {
          title: 'Discuss areas of improvement ',
          subtitle: '10-20min',
          description:
            'Discuss the Teaching Practices that teachers should improve.',
        },
        $6: {
          title: 'Next steps',
          subtitle: '5min',
          description:
            'Reflect on strategies teachers can apply in the classroom.',
        },
      },
    },
    checkingStats: {
      page_title: 'Community of Practice',
      title: 'Statistics summary',
      subtitle:
        'The CoP is the third step of Coach. It is conducted by the Head Teacher and can be supported by Lead Teachers.',
      button: 'Continue',

      chart: {
        title: 'School average score',
        average_title: 'The average school rating is:',
        average_subitle:
          'This rating is the average of all Teaching Practices observed in the school',
      },

      keys: {
        title: 'Key teaching pratices',
        subtitle:
          'Key teaching practices are the ones with highest and lowest scores in the school',

        tab_positive: 'Positives',
        tab_negative: 'Needs improvement',
      },
    },
    insights: {
      page_title: 'Community of Practice',
      title: 'Sharing insights',
      feedback: {
        title: 'What insights you had',
        placeholder: "e.g. teachers usually don't check for understanding",
        upload_title: 'Upload an image',
        upload_description:
          'Send a picture of the annotations you made in this step',
      },
    },
    positives: {
      page_title: 'Community of Practice',
      title: 'Good strategies',
      feedback: {
        title: 'What was positive',
        placeholder: 'e.g. teachers always try to respond to student’s needs',
        upload_title: 'Upload an image',
        upload_description:
          'Send a picture of the annotations you made in this step',
      },
    },
    improvements: {
      page_title: 'Community of Practice',
      title: 'Areas of improvement',
      feedback: {
        title: 'What needs improvement',
        placeholder: 'e.g. teachers should explain better the lessons',
        upload_title: 'Upload an image',
        upload_description:
          'Send a picture of the annotations you made in this step',
      },
    },
    next_steps: {
      page_title: 'Community of Practice',
      title: 'Next steps',
      feedback: {
        title: 'What strategies teachers can apply in the classroom',
        placeholder: 'e.g. teachers should bring more examples in each step',
        upload_title: 'Upload an image',
        upload_description:
          'Send a picture of the annotations you made in this step',
      },
    },
    finish: {
      page_title: 'Community of Practice',
      title: 'Community of Practice complete',
      description:
        'Congratulations, you just completed the Community of Practice!',
      button: 'Finish',
    },
  },
  tlc: {
    page_title: 'Teacher Learning Circles',

    loadingBar: {
      checkingStats: 'Check stats',
      unitSelect: 'Unit select',
      introduction: 'Introduction',
      situations: 'Situations',
      explanation: 'Explanation',
      activities: 'Activities',
      finish: 'Finish',
    },

    onboarding: {
      title: 'Getting started',
      subtitle:
        'Check out the Teaching Learning Circle steps and start a new session',
      button: 'Get started',

      process: {
        step1: {
          title: 'Check school stats',
          subtitle: '5 min',
          description:
            'View the school statistics to help you decide which unit to choose',
        },
        step2: {
          title: 'Select unit',
          subtitle: '5 min',
          description:
            'Select a unit from the list to work in this Teaching Learning Circle',
        },
        step3: {
          title: 'Unit introduction',
          subtitle: '15 min',
          description:
            'Explain to the teachers what this unit is about and how it can help them be a better teacher',
        },
        step4: {
          title: 'Situational examples',
          subtitle: '10 min',
          description:
            'Explain to the teachers what this unit is about and how it can help them be a better teacher',
        },
        step5: {
          title: 'Situation explanation',
          subtitle: '10 min',
          description: 'Explain why those situations were good or bad',
        },
        step6: {
          title: 'Activities',
          subtitle: '15 min',
          description:
            'Do some activities with the teachers to exercise what they learned',
        },
      },
    },
    checkingStats: {
      title: 'Overall rating',
      graphDesc:
        'This rating is the average of the school in all Teaching Practices',
      ratingTitle: 'Rating per Teaching Practice',
      ratingDesc: 'How is the average of the school in each Teaching Practice',
      empty: {
        title: 'No sufficient data for this school',
        description:
          'Complete class observations and feedback sessions to unlock the statistics of the school next time',
      },
      button: 'Next',
    },
    unitSelect: {
      title: 'Choose unit',
      description:
        'Each unit focus on one key teaching practice for teachers to learn from ans with each other',
      button: 'Start unit',
    },
    introduction: {
      $1: {
        title: 'Introduction',
        description:
          'This Teacher Learning Circle is about using positive language in the classroom to create an encouraging learning environment for students.',

        learn: {
          title: "In this unit you'll learn:",

          $1: {
            title: 'Why using positive language is important in a classroom',
          },
          $2: {
            title:
              'How positive language can be used in the classroom to encourage students',
          },
        },

        button: 'Next',
      },
      $2: {
        title: 'Why is it useful to use positive language in the classroom?',
        description:
          'It is important to create a classroom environment where students can feel emotionally safe and supported. All students feel welcome if the teacher treats them all respectfully.',
        button: 'Start examples',
      },
    },
    situations: {
      title: 'Situational examples',
      description:
        'Read out loud the examples below and ask the questions for the teachers',

      steps: {
        $1: {
          title: 'Example 1',
          description:
            'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and starts telling him that ‘you are not a good student’, ‘you never do your work’ or ‘you cannot do this work’.',
          box: {
            title: 'Discuss the following question',
            description:
              'How do you think the student will feel? How do you think they will behave?',
          },
        },

        $2: {
          title: 'Example 2',
          description:
            'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and tells him ‘you are a great student and if you try harder you can do this’',
          box: {
            title: 'Discuss the following question',
            description:
              'How do you think the student will feel? How do you think they will behave?',
          },
        },
      },

      button: 'Check explanation',
    },
    explanation: {
      title: 'Explanation',
      description:
        'Let the teachers know what was bad and what was good in the examples',

      steps: {
        $1: {
          title: 'Example 1',
          description:
            'In the first exchange, the words that the teacher uses are not supporting and encouraging for the student. The student will not feel good after hearing the words and will not be motivated to work hard. A teacher should try to be supportive to the students so students can work harder.',
        },
        $2: {
          title: 'Example 2',
          description:
            'In the second example the teacher sees that the student is finding it difficult to work and then tries to support him by saying positive words and encouraging them.',
        },
      },
      button: 'Next',
    },
    activities: {button: 'Next'},
    finish: {
      title: 'Rate the activity',
      description: 'How did it go?',
      question:
        'Did they manage to answer correctly? Did they understood the correct use of positive language?',
      button: 'Finish',
    },
  },
  sessionDetails: {
    title: 'Previous session',
    feedback: 'Feedback',
    observation: 'Observation',
  },
  feedbackSession: {title: 'Coaching session'},
};

export default enTranslation;
