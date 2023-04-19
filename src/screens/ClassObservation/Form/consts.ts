import {ICompetence} from '../../../types';

const MockCompetence: ICompetence[] = [
  {
    id: '1',
    title: 'Time on learning',
    questions: [
      {
        id: 'ex1',
        competence_id: '1',
        title: 'The students are working',
        description: 'In the first 10 minutes of the class',
        type: 'option',
        tooltipData: `{"title":"Students are not working","subtitle":"Consider that the student isn't participating if they're too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}`,
      },
      {
        id: 'ex2',
        competence_id: '1',
        title: 'The students are working',
        description: 'In the second 10 minutes of the class',
        type: 'option',
        tooltipData: `{"title":"Students are not working","subtitle":"Consider that the student isn't participating if they're too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}`,
      },
      {
        id: 'ex3',
        competence_id: '1',
        title: 'The students are working',
        description: 'In the third 10 minutes of the class',
        type: 'option',
        tooltipData: `{"title":"Students are not working","subtitle":"Consider that the student isn't participating if they're too distracted or disrupting the class","items":[{"icon":"chart-down","label":"Low","description":"Most students are not working"},{"icon":"heart-rate","label":"Medium","description":"Some students are working"},{"icon":"arrow-growth","label":"High","description":"Most students are working"}]}`,
      },
    ],
  },
  {
    id: '2',
    title: 'Supportive learning environment',
    questions: [
      {
        id: 'ex5',
        competence_id: '2',
        title: 'All students are treated respectfully',
        description: 'In the first 10 minutes of the class',
        type: 'option',
        tooltipData: `{"title":"All students are treated respectfully","subtitle":"Consider the treatment disrespectiful if the teacher shows aggressive behavior or unpolite, by shouting, shaming or with corporal punishment","items":[{"icon":"chart-down","label":"Low","description":"The teacher is disrepectful with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher isn't clearly disrespectful but isn't polite when talking to the students"},{"icon":"arrow-growth","label":"High","description":"The teacher is polite, referring the students by their names and saying please and thank you"}]}`,
      },
      {
        id: 'ex6',
        competence_id: '2',
        title: 'The teacher uses positive language',
        type: 'option',
        tooltipData: `{"title":"The teacher uses positive language","subtitle":"Consider the language negative if the teacher shows frustration or discourage the students when speaking","items":[{"icon":"chart-down","label":"Low","description":"The teacher uses negative languagem with the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses some positive languagem, but not frequently"},{"icon":"arrow-growth","label":"High","description":"The teacher uses positive language"}]}`,
      },
      {
        id: 'ex7',
        competence_id: '2',
        title: 'The teacher responds to students’ needs',
        type: 'option',
        tooltipData: `{"title":"The teacher responds to students' needs","subtitle":"The students may have needs to work in the class, such as materials or support at a lesson","items":[{"icon":"chart-down","label":"Low","description":"The teacher isn't aware of students' needs or isn't proactive to solve them"},{"icon":"heart-rate","label":"Medium","description":"The teacher responds to student's needs but don't address the problem at hand"},{"icon":"arrow-growth","label":"High","description":"The teacher quickly responds to students' needs and solve them"}]}`,
      },
      {
        id: 'ex8',
        competence_id: '2',
        title: 'All gender groups are treated fairly in the classroom',
        type: 'option',
        tooltipData: `{"title":"All gender groups are treated fairly in the classroom","subtitle":"A gender group is treated unfairly if the teacher provides different opportunities to participate in activities or have unequal expectations for students' behavior","items":[{"icon":"chart-down","label":"Low","description":"The teacher treats gender groups unfairly in the classroom"},{"icon":"heart-rate","label":"Medium","description":"The teacher doesn't treat gender groups unfairly"},{"icon":"arrow-growth","label":"High","description":"The teacher doesn't treat gender groups unfairly and makes it clear why any gender shouldn't be treated unfairly"}]}`,
      },
    ],
  },
  {
    id: '3',
    title: 'Positive behavioral expectations',
    questions: [
      {
        id: 'ex20',
        competence_id: '3',
        title: 'A clear behavioral expectations for class activities is set',
        type: 'option',
        tooltipData: `{"title":"A clear behavioral expectations for class activities is set","subtitle":"If the students aren't well-behaved throughout the lesson, the teacher is supposed to set clear behavor expectation for the students during the class or activity","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't set a clear behavioral expectations for class activities"},{"icon":"heart-rate","label":"Medium","description":"The teacher sets unclear or superficial behavioral expectations for class activities"},{"icon":"arrow-growth","label":"High","description":"The teacher sets clear behavioral expectations for class activities"}]}`,
      },
    ],
  },
  {
    id: '4',
    title: 'Effective teaching',
    questions: [
      {
        id: 'ex9',
        competence_id: '4',
        title:
          'The objectives of the lesson are explicitly articulated and related to the class',
        type: 'option',
        tooltipData: `{"title":"Questions and other strategies are used to ensure the understanding level","subtitle":"The teacher doesn't ensure students' understanding level if they don't ask questions or if they don't further check for underderstanding if it's unclear the uptake","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't ask questions or when they do, there's no further check for underderstanding"},{"icon":"heart-rate","label":"Medium","description":"The teacher uses questions and other strategies to ensure the understanding level of only few students"},{"icon":"arrow-growth","label":"High","description":"The teacher uses questions and other strategies to ensure the understanding level of most students"}]}`,
      },
      {
        id: 'ex10',
        competence_id: '4',
        title:
          'Questions and other strategies are used to ensure the understanding level',
        type: 'option',
        tooltipData: `{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn't monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}`,
      },
      {
        id: 'ex11',
        competence_id: '4',
        title: 'Most students are monitored during independent/group work',
        type: 'option',
        tooltipData: `{"title":"Most students are monitored during independent/group work","subtitle":"The teacher doesn't monitor the students if they sit at their desk or remain still while students are working","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't monitor the students during independent or group work"},{"icon":"heart-rate","label":"Medium","description":"The teacher monitor some students during independent or group work"},{"icon":"arrow-growth","label":"High","description":"The teacher monitor most students during independent or group work"}]}`,
      },
      {
        id: 'ex12',
        competence_id: '4',
        title: 'The teaching is adjusted to the level of the students',
        type: 'option',
        tooltipData: `{"title":"The teaching is adjusted to the level of the students","subtitle":"The teaching isn't adjusted to the level of the students if the teacher notice that the students are getting the wrong answer but doesn't re-explain or provide additional opportunities to learn","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't adjust the teaching to the level of the students"},{"icon":"heart-rate","label":"Medium","description":"The teacher slightly adjusts the teaching to the level of the students"},{"icon":"arrow-growth","label":"High","description":"The teacher greatly adjusts the teaching to the level of the students"}]}`,
      },
    ],
  },
  {
    id: '5',
    title: 'Positive behavioral expectations',
    questions: [
      {
        id: 'ex13',
        competence_id: '5',
        title: 'The teacher provides critical thinking tasks',
        type: 'option',
        tooltipData: `{"title":"The teacher provides thinking tasks","subtitle":"Classrooms with no thinking tasks include those where students simply listen to the teacher or perform rote tasks","items":[{"icon":"chart-down","label":"Low","description":"The teacher doesn't provide critical thinking tasks"},{"icon":"heart-rate","label":"Medium","description":"The teacher provides critical thinking tasks but they're too simple or similar to the teacher's examples"},{"icon":"arrow-growth","label":"High","description":"The teacher provides detailed critical thinking tasks to apply the learning to new tasks"}]}`,
      },
    ],
  },
];

export default MockCompetence;
