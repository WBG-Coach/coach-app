const npTranslation = {
  common: {
    search: 'खोज्नुहोस्',
    'image-picker': {
      'upload-image-modal-description': 'फोटो पठाउने तरिका छनौट गर्नुहोस्',
      'upload-image-modal-option-title': 'विकल्पहरू छान्नुहोस्',
      'take-photo-button': 'फोटो खिच्नुहोस्',
      'upload-image-modal-title': 'फोटोको रूपमा अपलोड गर्नुहोस्',
      'upload-image-modal-option-description':
        'तपाइँको टिप्पणीको तस्वीर पठाउन चाहानु भएको तरिका छान्नुहोस्',
      'photo-gallery-button': 'फोटो एल्बम',
    },
    'load-more': 'थप लोड गर्नुहोस्',
    optional: 'वैकल्पिक',
  },
  components: {
    starsTag: {
      notEvaluted: 'खराब',
      needsWork: 'सुधार गर्न आवश्यक छ',
      needsAttention: 'ध्यान दिन आवश्यक छ',
      almostThere: 'लगभग पुरा भयो',
      doingGreat: 'हुनुहुन्छ',
    },
  },
  bottom_navigator: {home: 'घर', tlc: 'TLC', pending: 'पेन्डिङ', cop: 'COP'},
  aboutScan: {
    title: 'QR कोड स्क्यान गर्नुहोस्',
    description: 'मेन्टर म्यानुअलमा रहेको QR कोड स्क्यान गर्नुहोस्',
    scan: 'QR कोड स्क्यान गर्नुहोस्',
  },
  login: {
    createAccount: {
      title: 'नयाँ खाता',
      name: 'नाम',
      surname: 'थार',
      pin_description: 'व्यक्तिगत पहिचान नम्बर',
      pin: 'पिन',
      birthdate: 'मेन्टरको जन्म मिति',
      'create-account-button': 'खाता बनाउनुहोस्',
      success: 'खाता सफलतापूर्वक बनाईएको छ',
      takePhoto: 'फोटो खिच्नुहोस्/छन्नु होस्',
      nin: 'NIN',
      nin_description: 'राष्ट्रिय पहिचान नम्बर',
    },
    accountCreated: {
      title: 'खाता बनाइयो',
      subtitle:
        'अब तपाईं यस उपकरणमा लग इन गर्न आफ्नो खाता प्रयोग गर्न सक्नुहुन्छ',
    },
  },
  logout: {
    title: 'के तपाइँ यो एपबाट साइन आउट गर्न निश्चित हुनुहुन्छ?',
    'confirm-button': 'हो',
    'cancel-button': 'रद्द गर्नुहोस्',
  },
  settings: {
    title: 'सेटिङ',
    'logout-description': 'यो सुरु देखि गर्नुहोस् ',
    language: 'भाषा',
    lastSync: 'पछिल्लो अपडेट: {{value}}',
    appVersion: 'एपको संस्करण',
    'unsynced-teacher': 'शिक्षकहरू:',
    'unsynced-feedback': 'प्रतिक्रिया:',
    changeLanguage: {
      button: 'अर्को',
      title: 'भाषा छनोट गर्नुस',
    },
    'unsynced-items': 'अद्यावधिक नभएको सूची',
    'sync-error-title': 'डाटा समक्रमण गर्न असमर्थ',
    logout: 'साइन आउट गर्नुहोस्',
    'unsynced-session': 'बैठक:',
    'sync-error-description':
      'आफ्नो इन्टरनेट जाँच गर्नुहोस् र फेरि प्रयास गर्नुहोस्',
  },
  coachSelect: {
    'new-profile': 'नयाँ प्रोफाइल सिर्जना गर्नुहोस्',
    title: 'आफ्नो प्रोफाइल चयन गर्नुहोस्',
    'item-description-empty': 'यहाँ कुनै प्रोफाइल छैन',
    'item-description_interval':
      'यहाँ कुनै सत्र छैन, यहाँ 1 सत्र छ, यहाँ 2 सत्रहरू छन्',
  },
  schoolSelect: {
    title: 'आफ्नो विद्यालय चयन गर्नुहोस्',
    'item-description_interval':
      '(0)[यहाँ अहिले कुनै शिक्षक छैनन्];(१)[१ शिक्षक अहिले यहाँ छन्];(२-inf)[{{count}} शिक्षकहरू अहिले यहाँ छन्];',
  },
  syncDetails: {
    title: 'व्यवस्थापन पूरा',
    description: 'आधारभूत डेटा संग device सेटअप गरिएको थियो',
    start: 'एप प्रयोग गर्न सुरु गर्नुहोस्',
    'description-list': 'तपाईं सक्षम हुनुहुनेछ',
  },
  home: {
    'menu-items': {
      statics: 'तथ्याङ्कहरु',
      switchSchools: 'विद्यालयहरू बदल्नुहोस्',
      switchCoach: 'मेन्टरहरू परिवर्तन गर्नुहोस्',
      pendingSession: 'विचाराधीन सत्रहरू',
      startOver: 'साइन आउट गर्नुहोस्',
      newSession: 'नयाँ सत्र सुरु गर्नुहोस्',
      switchProfile: 'फरक मेन्टरको प्रोफाइलमा जानुहोस्',
      coachScript: 'मेन्टरहरुको स्क्रिप्ट',
    },
    teachers: {
      title: 'शिक्षकहरू',
      addNew: 'नयाँ शिक्षक थप्नुहोस्',
      'no-session': 'अझै कुनै सत्र छैन। मेन्टरिङसुरु गर्नुहोस्!',
      'last-session': 'अघिल्लो सत्र {{date}} मा प्रविष्ट गरिएको थियो',
      session_interval: '(1)[1 अवलोकन];(2-inf)[{{count}} अवलोकनहरू];',
      teachers_count: 'यस विद्यालयका शिक्षकहरू:',
    },
    emptyState: {
      title: 'अहिलेसम्म शिक्षक दर्ता भएको छैन',
      description: 'मेन्टरिङ सुरु गर्न नयाँ शिक्षक थप्नुहोस्',
    },
    newSession: {
      subtitle: 'शिक्षक छान्नुहोस् र नयाँ अवलोकन सत्र सुरु गर्नुहोस्',
      title: 'नयाँ सत्र सुरु गर्नुहोस्',
    },
    stats: {
      tabs: {
        available: 'उपलब्ध तथ्याङ्कहरू',
        unavailable: 'अनुपलब्ध तथ्याङ्कहरू',
      },
      available: {
        title: 'उपलब्ध तथ्याङ्कहरू',
        subtitle:
          'मेन्टरिङ सत्रहरू मार्फत उनीहरूको विकास हेर्न शिक्षक चयन गर्नुहोस्',
        empty: {
          title: 'कुनै तथ्याङ्क उपलब्ध छैन',
          subtitle: 'शिक्षकको तथ्याङ्क तीन मेन्टरिङ सत्र पछि उपलब्ध हुन्छ।',
        },
      },
      unavailable: {
        title: 'अनुपलब्ध तथ्याङ्कहरू',
        empty: {
          title: 'सबै तथ्याङ्कहरू उपलब्ध छन्',
          subtitle:
            'तथ्याङ्कहरू हेर्नको लागि तपाइँलाई ती शिक्षकहरूसँग कम्तिमा ३  कोचिङ सत्रहरू पूरा गर्न आवश्यक छ।',
        },
        label: '{{value}} अतिरिक्त कोचिङ सत्र आवश्यक छ',
        subtitle:
          'तथ्याङ्कहरू हेर्नको लागि तपाइँलाई ती शिक्षकहरूसँग कम्तिमा ३  कोचिङ सत्रहरू पूरा गर्न आवश्यक छ।',
      },
      page_title: 'तथ्याङ्क',
      title: 'शिक्षक तथ्याङ्क जाँच गर्नुहोस्',
      empty: {
        title: 'अहिलेसम्म शिक्षक दर्ता भएको छैन',
        subtitle:
          'नयाँ शिक्षक थप्नुहोस् र तथ्याङ्कहरू हेर्न 3 मेन्टरिङ सत्रहरू पूरा गर्नुहोस्',
      },
    },
    pending: {
      page_title: 'अपूर्ण सत्रहरू',
      title: 'अपूर्ण सत्रहरू',
      list_subtitle: 'प्रतिक्रिया विचाराधीन',
      subtitle: 'निम्न शिक्षकहरूसँग प्रतिक्रिया सत्रहरू पूरा गर्नुहोस्',
    },
    teachersLength_interval: 'तपाईं कोचिंग मा हुनुहुन्छ ',
  },
  teacher: {
    form: {
      name: 'नाम',
      pin: 'पिन',
      nin: 'NIN',
      birthdate: 'शिक्षकको जन्म मिति',
      surname: 'थर',
      'title-new': 'नयाँ शिक्षक',
      subject: 'मुख्य विषय',
      'new-teacher-button': 'शिक्षक थप्नुहोस्',
      success: 'शिक्षक जानकारी सफलतापूर्वक थपिएको छ',
      pin_description: 'व्यक्तिगत पहिचान नम्बर',
      'title-edit': 'शिक्षक सम्पादन गर्नुहोस्',
      'update-teacher-button': 'शिक्षक सम्पादन गर्नुहोस्',
      nin_description: 'शिक्षकको कोड',
    },
    details: {
      editTeacher: 'शिक्षक सम्पादन गर्नुहोस्',
      description: '{{subject}} मा {{school}} शिक्षक',
    },
    tabs: {
      session: {
        title: 'अवलोकन सत्रहरू',
        session: 'अवलोकन सत्रहरू',
        stillNoSession: 'अहिलेसम्म कुनै अवलोकन सत्रहरू रेकर्ड गरिएको छैन',
        selectCoach: 'मेन्टरिङ सत्र चयन गर्नुहोस्',
        stillNoSessionDescription:
          'तपाईंले यस शिक्षकसँग नयाँ कक्षा अवलोकन सुरु गर्न सक्नुहुन्छ',
        newClassObservation: 'नयाँ कक्षा अवलोकन',
        viewSummary:
          'तपाईंले शिक्षकलाई प्रदान गर्नुभएको अवलोकन वा प्रतिक्रियाको सारांश हेर्न सक्नुहुन्छ',
      },
      stats: {
        title: 'शिक्षकको तथ्याङ्क',
        overallRating: 'कुल मूल्याङ्कन',
        currentRating: 'हालको मूल्याङ्कन:',
        ratingAverage:
          'यो मूल्याङ्कन पछिल्लो अवलोकनका सबै ५ वटा शिक्षण अभ्यासहरूको औसत हो',
        comparision: 'मेन्टरिङ सत्रहरूमा शिक्षकको मूल्याङ्कनमा परिवर्तन',
        lastSession: 'पछिल्लो सत्र देखि',
        seeDetails: 'विवरण हेर्नुहोस्',
        button: 'नयाँ कक्षा अवलोकन',
        empty: {
          button: 'नयाँ कक्षा अवलोकन गर्नुहोस्',
          title: 'अहिले देखाउनको लागि कुनै डाटा उपलब्ध छैन',
          subtitle:
            'तथ्याङ्कहरू देखाउन प्रतिक्रिया सत्रहरू सहित कम्तिमा तीन कक्षा अवलोकनहरू पूरा गर्नुहोस्',
        },
        ratingPerSession: 'प्रति सत्र मूल्याङ्कन',
        sessionName: 'सत्र {{value}}',
        evolution:
          'यो मूल्याङ्कन पछिल्लो अवलोकनका सबै ५ वटा शिक्षण अभ्यासहरूको औसत हो',
        teacherComparision: 'कोचिङ सत्रहरूमा शिक्षकको मूल्याङ्कनमा परिवर्तन',
        teacherAt: 'शिक्षक',
      },
    },
    subjects: {
      sl: {
        $6: 'गणित',
        $7: 'PHE',
        $10: 'अन्य',
        $2: 'रचनात्मक र प्रदर्शन कला',
        $3: 'सामान्य विज्ञान',
        $4: 'घरेलु अर्थशास्त्र',
        $5: 'भाषा कला',
        $8: 'मात्रात्मक र मौखिक योग्यता',
        $1: 'अरबी',
        $9: 'सामाजिक अध्ययन/नागरिकशास्त्र',
      },
      np: {
        $1: 'अंग्रेजी',
        $2: 'गणित',
        $3: 'विज्ञान र प्रविधि',
        $4: 'सामाजिक अध्ययन तथा मानव मूल्य मान्यता',
        $5: 'स्वास्थ्य शारीरिक तथा सिर्जनात्मक कला',
        $6: 'मातृभाषा तथा स्थानीय बिषय',
        $7: 'हाम्रो सेरोफेरो',
        $8: 'अन्य',
      },
    },
  },
  classObservation: {
    about: {
      step1: {
        title: 'तयारी',
        subtitle: '५  मिनेट',
        description:
          'कक्षा अघि शिक्षकसँग कुरा गर्नुहोस् र यदि तपाइँसँग पहिले नै कोच अवलोकन थियो भने अघिल्लो भ्रमणहरूमा तपाइँका टिप्पणीहरू समीक्षा गर्नुहोस्।',
      },
      step2: {
        title: 'कक्षाकोठा अवलोकन',
        subtitle: '३० देखि ४५ मिनेट',
        description:
          'नोटहरू लिनको लागि कक्षाको पछाडि बस्नुहोस् र आफ्नो फोनलाई साइलेन्ट मोडमा राख्न नबिर्सनुहोस्।',
      },
      step3: {
        title: 'मेन्टरिङ कुराकानी',
        subtitle: '२०-३० मिनेट',
        description:
          'शिक्षकलाई आफ्ना अवलोकनहरू प्रस्तुत गर्नुहोस्, उनीहरूको कक्षाको शिक्षणका लागि सकारात्मक पक्षहरू र सुधारका क्षेत्रहरू औंल्याउनुहोस्।',
      },
      step4: {
        title: 'अर्को चरणहरू',
        subtitle: '५ मिनेट',
        description:
          'शिक्षकसँगको सुधारको प्राथमिकता छनौट पश्चात कृपया आफ्नो आगामी  भ्रमणको मिति समय तय गर्नुहोस्',
      },
      title: 'मेन्टरिङ प्रक्रिया',
      'start-button': 'तयारी सुरु गर्नुहोस्',
    },
    setup: {
      button: 'अर्को चरण',
      title: 'पाठ बारे जान्नुहोस्',
      questions: {
        $1: {
          options: {
            $2: 'छात्र विद्यार्थी संख्या',
            $1: 'दुवै केटा र केटी विद्यार्थी',
            $3: 'छात्रा विद्यार्थी संख्या',
          },
          counters: {
            $1: '१ - १०',
            $2: '१० - ३०',
            $3: '३० - ६०',
            $4: '६०+',
          },
          placeholder: 'जस्तै : ७',
          title: 'कक्षामा कति विद्यार्थी छन् ?',
        },
        $3: {
          title: 'यो पाठ कहिलेसम्म चल्नेछ?',
          placeholder: '३० मिनेट',
          options: {
            $1: '२५ मिनेट',
            $2: '३० मिनेट',
            $3: '३५ मिनेट',
            $4: '४० मिनेट',
            $5: '४५ मिनेट',
            $6: '५० मिनेट',
            $7: '५५ मिनेट',
            $8: '६० मिनेट',
          },
        },
        $4: {
          title: 'पाठका उद्देश्यहरू के हुन्?',
          placeholder: 'सिकाउनु पर्ने कुराको शिक्षकको विवरण',
        },
        $2: {
          placeholder: 'गणित',
          title: 'विषय वस्तु के हो?',
        },
        $0: {
          placeholder: 'दुबै विकल्प',
          title: 'कक्षाकोठामा',
        },
      },
      subtitle: 'शिक्षकलाई निम्न प्रश्नहरू सोध्नुहोस्',
    },
    title: 'कक्षाकोठा  अवलोकन',
    formConfirmation: {
      button: 'पुष्टि गर्नुहोस्',
      buttonEdit: 'सम्पादन गर्नुहोस्',
      competenceView: {
        title: 'कक्षा अवलोकनको संक्षिप्त विवरण',
        subtitle: 'तपाईंको कक्षा अवलोकन पुनरावलोकन गर्नुहोस्',
        overallRating: 'समग्र अवलोकन मूल्याङ्कन',
      },
    },
    form: {
      title: 'कक्षाकोठा  अवलोकन',
      keyPoints: 'छलफलको मुख्य बुँदाहरु',
      subtitle:
        'तपाईंको मूल्याकंन अनुसार सम्बन्धित प्रत्येक शिक्षण सिकाईलाई अकंभार दिनुहोस्',
      pointsToDiscuss: 'शिक्षकसँँग तँपाई के सम्बन्धी छलफल गर्न चहानुहुन्छ ?',
      spaceAdditional:
        'शिक्षकसँग छलफल गर्नुपर्ने बुँदाहरु दिईएको ठाउँ आवश्यक टिपोट गर्नुहोस्',
      competenciesRated: '{{count}} को {{total}} शिक्षण सिकाईको अकंभार',
      'keyPoints-placeholder': 'सकारात्मक र नकारात्मक बुँदाहरु',
      button: 'पूर्ण अवलोकन',
    },
    observationCompleted: {
      title: 'कक्षा अवलोकन पूरा भयो',
      subtitle: 'धन्यवाद. कक्षा अवलोकन खण्ड पूरा भएको छ!',
      whatsNext: 'अब के हुन्छ ?',
      startFeedback:
        'तपाईं अहिले शिक्षकलाई आफ्नो प्रतिक्रिया प्रविष्ट गर्न सुरु गर्न सक्नुहुन्छ वा तपाईं होम स्क्रिनमा फर्कन सक्नुहुन्छ र शिक्षक प्रोफाइल चयन गरेर पछि यो गर्न सक्नुहुन्छ',
      button: 'कृपया सुझाव प्रदान गर्नुहोला',
      buttonBack: 'होमस्क्रिनमा फर्कनुहोस्',
    },
  },
  feedback: {
    form: {
      title: 'कार्यमा सहमत हुनुहोस्',
      actionsToImprove: 'सुधारका लागि कार्यहरू',
      uploadImage: 'फोटो अपलोड गर्नुहोस्',
      button: 'मेन्टरिङ सत्र पूरा गर्नुहोस्',
      textAreaPlaceholder:
        'उदाहरणका लागि, उनीहरूले विद्यार्थीहरूसँग बोल्ने तरिका रेकर्ड गर्नुहोस्',
      uploadPhoto: 'फोटो अपलोड गर्नुहोस्',
      subtitle:
        'शिक्षकको शिक्षण सिकाईलाई सुधार गर्न कुन कार्यहरु गर्नेमा सहमत हुनुहोस्',
      describeActions:
        'यस शिक्षण अभ्यासको सन्दर्भमा सुधार गर्न तपाईंले र शिक्षकले गर्ने सहमति भएका कार्यहरू वर्णन गर्नुहोस्',
      sendPicture:
        'तपाईंले कक्षा अवलोकन र कोचिङ सत्रको समयमा लिनुभएको नोटहरूको तस्बिर वा कक्षा सम्बन्धमा कुनै अन्य रोचक कागजातहरू पनि पठाउन सक्नुहुन्छ।',
    },
    mentoringSection: {
      title: 'राम्रो अभ्यासहरू',
      bestPratices:
        'यदि तपाइँ अभ्यासहरू सम्झनुहुन्न भने, मेन्टर म्यानुअल हेर्नुहोस्',
      continueButton: 'प्रतिक्रिया सत्र जारी राख्नुहोस्',
      subtitle:
        'आफ्नो प्रशिक्षणबाट राम्रा अभ्यासहरू सम्झनुहोस् र तिनीहरूलाई व्यवहारमा राख्नुहोस्।',
      trainingButton: 'मेन्टर म्यानुअल पहुँच गर्नुहोस्',
    },
    completed: {
      title: 'मेन्टरिङ सत्र सम्पन्न',
      subtitle: 'धन्यवाद! तपाईंले भर्खरै मेन्टरिङ प्रक्रिया पूरा गर्नुभयो।',
      aboutNext: 'अब के हुन्छ ?',
      aboutNextDescription:
        'शिक्षण सिकाइ सर्कलहरूको लागि तयार रहनुहोस्, तबसम्म तपाईंले गृह स्क्रिनमा फर्केर र नयाँ शिक्षक चयन गरेर शिक्षकसँग नयाँ अवलोकनहरू सिर्जना गर्न सक्नुहुन्छ।',
      button: 'गृह स्क्रिनमा फर्कनुहोस्',
    },
    preparation: {
      title: 'शिक्षण सिकाई छनौट गर्नुहोस्',
      subtitle:
        'शिक्षकसँग काम गर्न अनिवार्य रुपमा १ शिक्षण अभ्यास छनौट गर्नुहोस्',
      teachingPratice: 'शिक्षण सिकाई {{index}}',
      button: 'मेन्टरिङ सत्र पुरा भयो',
    },
  },
  cop: {
    start: {
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
    stats: {
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
      },
    },
    positives: {
      page_title: 'Community of Practice',
      title: 'Sharing insights',
      feedback: {
        title: 'What insights you had',
        placeholder: "e.g. teachers usually don't check for understanding",
      },
    },
    improvements: {
      page_title: 'Community of Practice',
      title: 'Sharing insights',
      feedback: {
        title: 'What insights you had',
        placeholder: "e.g. teachers usually don't check for understanding",
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
    loadingBar: {
      situations: 'परिस्थितिहरू',
      explanation: 'व्याख्या',
      finish: 'समाप्त गर्नुहोस्',
      introduction: 'परिचय',
      activities: 'गतिविधिहरु',
      checkingStats: 'तथ्याकं हर्नुहोस्',
      unitSelect: 'एकाइ चयन हेर्नुहोस्',
    },
    onboarding: {
      process: {
        step6: {
          title: 'गतिविधिहरु',
          subtitle: '१५ मिनेट',
          description:
            'शिक्षकहरूले सिकेका कुराहरू प्रयोग गर्न शिक्षकहरूसँग केही गतिविधिहरू गर्नुहोस्',
        },
        step1: {
          title: 'विद्यालय तथ्याङ्क जाँच गर्नुहोस्',
          subtitle: '५ मिनेट',
          description:
            'कुन एकाइ छनोट गर्ने भन्ने निर्णय गर्न मद्दत गर्न विद्यालय तथ्याङ्कहरू हेर्नुहोस्',
        },
        step2: {
          title: 'इकाइ छनौट गर्नुहोस्',
          subtitle: '५ मिनेट',
          description:
            'यस शिक्षण सिकाइ सर्कलमा काम गर्न सूचीबाट एक इकाइ चयन गर्नुहोस्',
        },
        step3: {
          title: 'इकाइ परिचय',
          subtitle: '१५ मिनेट',
          description:
            'शिक्षकहरूलाई यो इकाइ बारेमा र यो इकाइले उनीहरूलाई राम्रो शिक्षक बन्न कसरी मद्दत गर्न सक्छ भनी व्याख्या गर्नुहोस्',
        },
        step4: {
          title: 'परिस्थितिजन्य उदाहरणहरू',
          subtitle: '१० मिनेट',
          description:
            'शिक्षकहरूलाई यो इकाइ बारेमा र यो इकाइले उनीहरूलाई राम्रो शिक्षक बन्न कसरी मद्दत गर्न सक्छ भनी व्याख्या गर्नुहोस्',
        },
        step5: {
          title: 'परिस्थितिजन्य उदाहरणहरू',
          subtitle: '१० मिनेट',
          description:
            'ती परिस्थितिहरू किन राम्रो वा नराम्रो थिए व्याख्या गर्नुहोस्',
        },
      },
      title: 'सुरु गर्दै',
      subtitle:
        'शिक्षण सिकाइ सर्कल चरणहरू हेर्नुहोस् र नयाँ सत्र सुरु गर्नुहोस्',
      button: 'सुरु गर्नुहोस्',
    },
    checkingStats: {
      button: 'अर्को चरण',
      ratingTitle: 'मूल्याङ्कन प्रति शिक्षण अभ्यास',
      empty: {
        title: 'यस विद्यालयको लागि पर्याप्त डाटा छैन',
        description:
          'अर्को पटक विद्यालयको तथ्याङ्क अनलक गर्न कक्षा अवलोकन र प्रतिक्रिया सत्रहरू पूरा गर्नुहोस्',
      },
      title: 'समग्र  मूल्याङ्कन',
      graphDesc: 'यो मूल्याङ्कन सबै शिक्षण अभ्यासहरूमा विद्यालयको औसत हो',
      ratingDesc: 'प्रत्येक शिक्षण अभ्यासमा विद्यालयको औसत कस्तो छ',
    },
    unitSelect: {
      button: 'एकाइ सुरु गर्नुहोस्',
      title: 'एकाइ छान्नुहोस्',
      description:
        'प्रत्येक एकाइले शिक्षकहरूलाई एकअर्काबाट सिक्नको लागि एउटा मुख्य शिक्षण अभ्यासमा केन्द्रित गर्दछ',
    },
    introduction: {
      $1: {
        button: 'अर्को चरण',
        title: 'परिचय',
        learn: {
          $1: {
            title: 'कक्षाकोठामा सकारात्मक भाषाको प्रयोग किन महत्त्वपूर्ण छ',
          },
          title: 'यस इकाईमा तपाईंले सिक्नुहुनेछ:',
          $2: {
            title:
              'विद्यार्थीहरूलाई प्रोत्साहन दिन कक्षाकोठामा कसरी सकारात्मक भाषा प्रयोग गर्न सकिन्छ',
          },
        },
        description:
          'यो शिक्षक सिकाइ सर्कल विद्यार्थीहरूको लागि प्रोत्साहनजनक सिकाइ वातावरण सिर्जना गर्न कक्षाकोठामा सकारात्मक भाषा प्रयोग गर्नेको लागि हो।',
      },
      $2: {
        button: 'उदाहरणहरू हेर्न सुरु गर्नुहोस्',
        title: 'कक्षाकोठामा सकारात्मक भाषा प्रयोग गर्नु किन उपयोगी छ?',
        description:
          'विद्यार्थीहरूले भावनात्मक रूपमा सुरक्षित र समर्थन महसुस गर्न सक्ने कक्षाकोठाको वातावरण सिर्जना गर्नु महत्त्वपूर्ण छ। शिक्षकले सबैलाई आदरपूर्वक व्यवहार गरेमा सबै विद्यार्थीहरू सहज महसुस गर्छन्।',
      },
    },
    explanation: {
      button: 'अर्को चरण',
      steps: {
        $2: {
          title: 'उदाहरण २',
          description:
            'दोस्रो उदाहरणमा शिक्षकले विद्यार्थीलाई काम गर्न गाह्रो भइरहेको देख्छन् र त्यसपछि सकारात्मक शब्दहरू बोलेर र प्रोत्साहन दिएर उसलाई समर्थन गर्ने प्रयास गर्छन्।',
        },
        $1: {
          title: 'उदाहरण १',
          description:
            'पहिलो आदानप्रदानमा, शिक्षकले प्रयोग गर्ने शब्दहरू विद्यार्थीको लागि समर्थन र प्रोत्साहनजनक छैनन्। ति शब्दहरू सुनेर विद्यार्थीलाई राम्रो लाग्दैन र कडा परिश्रम गर्न उत्प्रेरित हुनेछैन। शिक्षकले विद्यार्थीहरूलाई सहयोग गर्ने प्रयास गर्नुपर्छ ताकि विद्यार्थीहरूले कडा परिश्रम गर्न सकून्।',
        },
      },
      title: 'व्याख्या',
      description:
        'शिक्षकहरूलाई उदाहरणहरूमा के नराम्रो र के राम्रो थियो थाहा दिनुहोस्',
    },
    activities: {
      button: 'अर्को चरण',
    },
    finish: {
      button: 'समाप्त',
      title: 'गतिविधि मूल्याङ्कन गर्नुहोस्',
      description: 'यो कस्तो भयो ?',
      question:
        'के उनिहरुले सही जवाफ दिन सके ? के उनिहरुले  सकारात्मक भाषाको सही प्रयोग बारे  बुझे?',
    },
    situations: {
      steps: {
        $1: {
          description:
            'शिक्षकले कक्षालाई अवधारणा सिकाउँछन् र उनीहरूलाई कक्षाकार्य दिन्छन्। शिक्षकले एकजना विद्यार्थीले उसलाई  तोकिएको काम गर्न नसक्ने देख्छन्। शिक्षक विद्यार्थीकहाँ गएर ‘तिमी राम्रो विद्यार्थी होइनौ’, ‘तिमीले आफ्नो काम कहिल्यै गर्न सक्दैनौ’ वा ‘तिमीले यो काम गर्न सक्दैनौ’ भन्न थाल्छन् ।',
          box: {
            title: 'निम्न प्रश्नमा छलफल गर्नुहोस्',
            description:
              'तपाईको बिचारमा  विद्यार्थीलाई कस्तो लाग्छ ? तिनीहरूले कस्तो व्यवहार गर्नेछन् जस्तो लाग्छ?',
          },
          title: 'उदाहरण १',
        },
        $2: {
          box: {
            title: 'निम्न प्रश्नमा छलफल गर्नुहोस्',
          },
          title: 'उदाहरण २',
          description:
            'शिक्षकले कक्षालाई अवधारणा सिकाउँछन् र उनीहरूलाई कक्षाकार्य दिन्छन्। शिक्षकले एकजना विद्यार्थीले उसलाई  तोकिएको काम गर्न नसक्ने देख्छन्। शिक्षक विद्यार्थीकहाँ गएर भन्छन्, ‘तिमी उत्कृष्ट विद्यार्थी हौ र यदि तिमीले धेरै प्रयास गरेमा यो गर्न सकिन्छ’',
        },
      },
      button: 'व्याख्या जाँच गर्नुहोस्',
      title: 'परिस्थितिजन्य उदाहरणहरू',
      description:
        'तलका उदाहरणहरू ठूलो स्वरमा पढ्नुहोस् र शिक्षकहरूलाई प्रश्नहरू सोध्नुहोस्',
    },
    page_title: 'शिक्षण सिकाई सर्कलहरु',
  },
  feedbackSession: {
    title: 'मेन्टरिङ सत्र',
  },
  sessionDetails: {
    title: 'अघिल्लो सत्र',
  },
  errors: {
    requiredField: 'यो प्रश्नको जवाफ अनिवार्य छ।',
  },
};

export default npTranslation;
