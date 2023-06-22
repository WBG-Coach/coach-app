const ptTranslation = {
  noGeolocation: {
    title: 'Serviço de localização não permitido',
    description:
      'Precisamos de acesso à sua localização para fornecer uma ótima experiência de Coach',
    allowButton: 'Permitir serviço de localização',
  },
  setupUserData: {
    schoolSelect: {
      title: 'Selecione a escola',
      lineDesc: '{{count}} professores aqui',
      emptyList: 'Nenhuma escola para esse filtro',
    },
    profileSelect: {
      title: 'Selecione seu perfil',
      lineDesc: 'Coaching de {{count}} professores',
      emptyList: 'Nenhum perfil para esse filtro',
      create: {
        title: 'Criar novo perfil',
        takePhoto: 'Tirar/escolher foto',
        name: 'Nome',
        surname: 'Sobrenome',
        emis: 'Número EMIS',
        optional: 'Opcional',
        button: 'Adicionar perfil',
      },
      created: {
        title: 'Perfil criado',
        subtitle:
          'Agora você pode selecionar seu perfil e começar a orientar os professores',
        button: 'Ir para seleção de perfil',
      },
    },
  },
  home: {
    items: {
      newSession: 'Iniciar nova sessão',
      switchSchools: 'Trocar de escola',
      switchProfile: 'Trocar de perfil',
      offlineSync: 'Sincronização offline',
      statics: 'Estatísticas',
      pendingSession: 'Sessões pendentes',
    },
    teachersLength_interval:
      '(0)[Nenhum professor];(1)[1 Professor em orientação];(2-inf)[{{count}} Professores em orientação];',
    teachers: {
      title: 'Professores',
      session_interval: '(1)[1 Sessão];(2-inf)[{{count}} Sessões]',
      addNew: 'Adicionar novo professor',
    },
  },
  teacher: {
    description: 'Professor(a) $name na escola $school',
    tabs: {
      session: {
        title: 'Sessões',
        session: 'Sessão',
        newClassObservation: 'Nova observação de aula',
        stillNoSession: 'Ainda não há sessão',
        stillNoSessionDescription:
          'Você pode iniciar uma nova observação de aula com este professor',
        pendingFeedback: 'Feedback de sessão pendente',
        haventDone:
          'Você ainda não fez o feedback da última observação de aula com este professor',
        startFeedback: 'Iniciar feedback agora',
        selectCoach: 'Selecionar parte do coaching',
        viewSummary:
          'Você pode visualizar o resumo da observação ou do feedback que teve com o professor',
        feedback: {
          title: 'Resumo do feedback da sessão',
          subtitle: 'Verifique como foi a conversa com o professor',
          actions:
            'Essas são as ações acordadas entre você e o professor para melhorar nesta prática de ensino',
          image: 'Imagem enviada',
          imageDescription:
            'Você pode verificar a imagem que enviou com suas anotações',
        },
      },
      stats: {
        title: 'Estatísticas do professor',
        editTeacher: 'Editar professor',
        overallRating: 'Avaliação geral',
        currentRating: 'A avaliação atual é:',
        ratingAverage:
          'Essa avaliação é a média das 5 Práticas de Ensino na última observação',
        evolution:
          'Essa avaliação é a média das 5 Práticas de Ensino na última observação',
        comparisio:
          'Comparação que apresenta a melhoria do professor por meio das sessões de coaching',
        lastSession: 'desde a última sessão',
        seeDetails: 'Ver detalhes',
        button: 'Nova observação de aula',
        empty: {
          title: 'Nenhum dado para exibir no momento',
          subtitle:
            'Realize observações de aula completas e sessões de feedback para mostrar as estatísticas',
          button: 'Nova observação de aula',
        },
        scale: {
          high: 'Melhorou',
          low: 'Precisa de trabalho',
        },
        ratingPerSession: 'Avaliação por sessão',
        teacherComparision:
          'Comparação que apresenta a melhoria do professor por meio das sessões de coaching',
        sessionName: 'Sessão',
      },
    },
    create: {
      editTeacher: 'Editar um professor',
      newTeacher: 'Adicionar um novo professor',
      takePhoto: 'Tirar/escolher foto',
      firstName: 'Nome',
      lastName: 'Sobrenome',
      emisNumber: 'Número EMIS',
      principalSubject: 'Matéria principal',
      principalSubjectPlaceholder: 'ex: Matemática',
      dateOfBirth: 'Data de nascimento',
      buttonSave: 'Salvar',
      buttonAdd: 'Adicionar professor',
    },
    created: {
      title: 'Novo professor adicionado',
      subtitle:
        'O professor estará disponível na lista de professores na página inicial do aplicativo',
      startCoaching: 'Iniciar orientação deste professor',
      selectProfile:
        'Selecione o perfil dele(a) e clique no botão "Nova observação de aula" para começar',
      button: 'Concluir',
    },
  },
  splash: {},
  settings: {
    settings: {
      title: 'Idioma',
      lastSync: 'Última sincronização: {{value}}',
      appVersion: 'Versão do aplicativo',
    },
    changeLanguage: {
      title: 'Selecionar idioma',
      button: 'Próximo',
    },
  },
  classObservation: {
    observationCompleted: {
      title: 'Observação de aula concluída',
      subtitle:
        'Parabéns, você acabou de concluir o processo de avaliação da aula!',
      whatsNext: 'O que vem a seguir?',
      startFeedback:
        'Você pode iniciar o feedback com o professor agora mesmo ou pode voltar para a página inicial e fazer isso mais tarde, selecionando o perfil do professor',
      button: 'Iniciar preparação do feedback',
      buttonBack: 'Voltar para a página inicial',
    },
    formConfirmaton: {
      button: 'Concluir observação',
      buttonEdit: 'Editar avaliação',
      competenceView: {
        title: 'Resumo da observação de aula',
        subtitle: 'Revise como você avaliou a aula',
        overallRating: 'Avaliação geral',
      },
    },
    create: {
      title: 'Processo de mentoria',
      button: 'Iniciar preparação',
      process: {
        el1: {
          title: 'Preparação',
          subtitle: '5 minutos',
          description:
            'Converse com o professor antes da aula e revise suas anotações se você já teve uma observação de coach anteriormente.',
        },
        el2: {
          title: 'Observação em sala de aula',
          subtitle: '30-45 minutos',
          description:
            'Sente-se no fundo da sala para fazer anotações e lembre-se de colocar o celular no modo silencioso.',
        },
        el3: {
          title: 'Conversa de orientação',
          subtitle: '20-30 minutos',
          description:
            'Apresente ao professor suas observações, apontando os pontos positivos e negativos de sua aula.',
        },
        el4: {
          title: 'Próximos passos',
          subtitle: '5 minutos',
          description:
            'Após concordar com o professor sobre os principais próximos passos, agende a próxima visita.',
        },
      },
    },
    onboarding: {
      skip: 'Pular',
      start: 'Iniciar',
      next: 'Próximo',
      sections: {
        $1: {
          title: 'Informar o professor',
          subtitle:
            'Certifique-se de entrar em contato com o professor e informá-lo(a) que você vai observar a aula e ter uma sessão de mentoria',
        },
        $2: {
          title: 'Atenção ao tempo',
          subtitle:
            'Planeje passar de 60 a 75 minutos com o professor. Use esse tempo para observar a aula dele(a) e ter a sessão de mentoria',
        },
        $3: {
          title: 'Faça anotações',
          subtitle:
            'As anotações vão ajudar você a responder as perguntas de observação e planejar as futuras sessões de mentoria',
        },
      },
    },
    setup: {
      title: 'Sobre a aula',
      subtitle: 'Faça as seguintes perguntas ao professor',
      description: 'Faça as seguintes perguntas ao professor',
      button: 'Próximo',
      questions: {
        $1: {
          title: 'Quantos alunos são meninos?',
          placeholder: '15',
        },
        $2: {
          title: 'Quantas alunas são meninas?',
          placeholder: '15',
        },
        $3: {
          title: 'Qual é a disciplina?',
          placeholder: 'Matemática',
        },
        $4: {
          title: 'Quanto tempo vai durar a aula?',
          placeholder: '30 minutos',
        },
        $5: {
          title: 'Descrição do professor sobre a aula',
          placeholder: 'Descrição do professor sobre a aula',
        },
      },
    },
    form: {
      title: 'Avaliação da aula',
      subtitle: 'Avalie cada tópico com base em sua observação',
      keyPoints: 'Pontos principais a serem discutidos',
      pointsToDiscuss: 'O que você deseja discutir com o professor?',
      spaceAdditional:
        'Use este espaço para anotações adicionais que você gostaria de discutir com o professor',
      competenciesRated: '{{count}} de {{total}} competências avaliadas',
      button: 'Concluir observação',
    },
  },
  feedback: {
    mentoringSection: {
      title: 'Melhores práticas',
      subtitle:
        'Lembre-se das boas práticas do seu treinamento e coloque-as em prática.',
      bestPratices:
        'Se você não se lembra das melhores práticas, acesse o Guia de Treinamento',
      continueButton: 'Continuar para a preparação do feedback',
      trainingButton: 'Acessar Guia de Treinamento',
    },
    feedbackPreparation: {
      title: 'Escolha práticas de ensino',
      subtitle: 'Escolha 1 prática de ensino para trabalhar com o professor',
      teachingPratice: 'Prática de ensino 2',
      button: 'Concluir sessão de coaching',
    },
    defineActions: {
      title: 'Definir as ações',
      subtitle:
        'Defina com o professor quais ações ele tomará para melhorar essa prática de ensino',
      actionsToImprove: 'Ações para melhorar',
      describeActions:
        'Descreva as ações que você e o professor concordaram em tomar para melhorar nessa prática de ensino',
      textAreaPlaceholder:
        'ex: Ficar mais atento à forma como se comunicam com os alunos',
      uploadImage: 'Enviar uma imagem',
      sendPicture:
        'Você também pode enviar uma imagem das anotações que fez durante a observação da aula e a sessão de mentoria',
      uploadPhoto: 'Enviar uma foto',
      button: 'Concluir sessão de coaching',
    },
    feedbackCompleted: {
      title: 'Feedback completo',
      subtitle: 'Parabéns, você acabou de concluir o processo de coaching!',
      aboutNext: 'E agora?',
      aboutNextDescription:
        'Mantenha-se preparado para os Círculos de Ensino e Aprendizagem, até lá você pode criar novas observações com um professor selecionando-os na página inicial do aplicativo',
      button: 'Voltar para a página inicial',
    },
  },
  header: {
    settings: 'Configurações',
    newsession: 'Nova sessão',
    teacher: 'Professor',
    newTeacher: 'Novo professor',
    updateTeacher: 'Atualizar professor',
    newClassObservation: 'Nova observação de aula',
    preparation: 'Preparação',
    classObservation: 'Observação de aula',
    observationSummary: 'Resumo da observação',
    observationComplete: 'Observação completa',
    mentoringSession: 'Sessão de mentoria',
    feedbackPreparation: 'Preparação do feedback',
    feedbackComplete: 'Feedback completo',
    previousSession: 'Sessão anterior',
    pendingSession: 'Sessões pendentes',
    teacherstats: 'Estatísticas do professor',
    newprofile: 'Novo perfil',
  },
  components: {
    starsTag: {
      notEvaluted: 'Não avaliado',
      needsWork: 'Precisa melhorar',
      needsAttention: 'Precisa de atenção',
      almostThere: 'Quase lá',
      doingGreat: 'Ótimo desempenho',
    },
  },
  quickAccess: {
    newSession: {
      title: 'Iniciar nova sessão',
      subtitle: 'Selecione um professor e inicie uma nova sessão de observação',
    },
    stats: {
      title: 'Ver estatísticas do professor',
      subtitle: 'Selecione um professor para ver o progresso dele',
    },
  },
};

export default ptTranslation;
