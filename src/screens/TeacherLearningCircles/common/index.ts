import {
  FirstStepImage,
  SecondStepImage,
} from '../../../assets/images/tlc/introduction';
import {Unit} from '../../../types/unit';

const units: Unit[] = [
  {
    title: 'Unit 1',
    description: 'Using Positive language',
    activities: [
      {
        title: 'Activity 1',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',

        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'Can anyone tell me, what is 3 multiplied by 9?',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: '20',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'Wrong. You are never able to give the right answer',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Sorry sir',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'What sorry? You are a very bad student.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Next',
      },
      {
        title: 'Activity 2',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',

        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'Can anyone tell me what is 5 Multiplied by 3 is?',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: '10',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'No. But try again, you are very good student I am sure if you think you can give the right answer. Remember when we discussed the table of 5.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Yes sir',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'So when we multiple 5 with 3 what is the answer?',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: '15',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Yes! Very good. See I told you that if you try you will get the right answer. You are a very good student of the class just like all the other students.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Check response',
      },
      {
        title: 'Response',
        evaluativeList: [
          {
            icon: 'comments',
            title: 'Activity 1',
            description:
              'No, the teacher was not supportive of the student. The teacher didn’t use positive words when the student was unable to give the right answer. Because of this the student stopped trying and feels that he cannot have the right answer.',
            box: {
              title: "What's next?",
              description:
                'For the tasks the teachers are going to exercise some positive words to be used in the classroom',
              icon: 'info-circle-solid',
              iconColor: '#7A0CE8',
              bgColor: '#F5ECFE',
            },
          },
        ],
        buttonLabel: 'Start task',
      },
      {
        title: 'Tasks',
        evaluativeList: [
          {
            icon: 'tasks',
            title: 'Task 1',
            description:
              'Design a lesson plan such that the objective of the lesson is very clearly stated and each activity is connected to the objective.',
          },
        ],
        buttonLabel: 'Rate participation',
      },
    ],
    introduction: [
      {
        image: FirstStepImage,
        title: 'Introduction',
        subtitle:
          'This Teacher Learning Circle is about using positive language in the classroom to create an encouraging learning environment for students.',
        buttonLabel: 'Next',
      },
      {
        image: SecondStepImage,
        title: 'Why is it useful to use positive language in the classroom?',
        subtitle:
          'It is important to create a classroom environment where students can feel emotionally safe and supported.  All students feel welcome if the teacher treats them all respectfully.',
        buttonLabel: 'Start examples',
      },
    ],
    situational: [
      {
        title: 'Situational examples',
        subtitle:
          'Read out loud the examples below and ask the questions for the teachers',
        evaluativeList: [
          {
            icon: 'comment',
            title: 'Example 1',
            description:
              'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and starts telling him that ‘you are not a good student’, ‘you never do your work’ or ‘you cannot do this work’.',
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
          {
            icon: 'comment',
            title: 'Example 2',
            description:
              'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and tells him ‘you are a great student and if you try harder you can do this’',
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Check explanation',
      },
    ],
    explanation: [
      {
        title: 'Explanation',
        subtitle:
          'Let the teachers know what was bad and what was good in the examples',
        evaluativeList: [
          {
            icon: 'badExample',
            title: 'Example 1',
            description:
              'In the first exchange, the words that the teacher uses are not supporting and encouraging for the student. The student will not feel good after hearing the words and will not be motivated to work hard. A teacher should try to be supportive to the students so students can work harder.',
          },
          {
            icon: 'goodExample',
            title: 'Example 2',
            description:
              'In the second example the teacher sees that the student is finding it difficult to work and then tries to support him by saying positive words and encouraging them.',
          },
        ],
      },
    ],
  },
  {
    title: 'Unit 2',
    description: 'Clearly stating the objectives of the lesson',
    activities: [
      {
        title: 'Activity 1',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',
        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Take out your books and notebooks. And start copying what I am writing on the board.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'When you have written let me know.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'We are done sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Okay, now you have 5 minutes to prepare and I will take a test.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Next',
      },
      {
        title: 'Activity 2',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',

        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Hello class. Today we will learn about double digital multiplication and how we can do double digit multiplication. I am also writing the objective on the board, please take out your note books and first note the objective on your notebooks.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'I am writing two questions of double digit multiplication on the board. Also, please pay attention as I solve these questions. Then you copy them in the notebook',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'Are there any questions?',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'No sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Okay, I am writing two more questions of double digit multiplication this time I want you to do them on your copies. You can ask me any question you want.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Check response',
      },
      {
        title: 'Response',
        evaluativeList: [
          {
            icon: 'comments',
            title: 'Activity 1',
            description:
              'No, the teacher was not supportive of the student. The teacher didn’t use positive words when the student was unable to give the right answer. Because of this the student stopped trying and feels that he cannot have the right answer.',
          },
          {
            icon: 'comments',
            title: 'Activity 2',
            description:
              'The second example is very good as the teacher first explains the topic, writes it on the board and then asks the students to also write the topic on their copies. The teacher then explains the questions and reminds students that these are both double digit multiplication questions. Then the teacher gives tasks to the students and asks them to perform double digit multiplication. By doing all this, the teacher has made sure the students know what is the objective of the lesson and then also connects each activity to the objective.',
            box: {
              title: "What's next?",
              description:
                'For the tasks the teachers are going to exercise some positive words to be used in the classroom',
              icon: 'info-circle-solid',
              iconColor: '#7A0CE8',
              bgColor: '#F5ECFE',
            },
          },
        ],
        buttonLabel: 'Start task',
      },
      {
        title: 'Tasks',
        evaluativeList: [
          {
            icon: 'comments',
            title: 'Task 1',
            description:
              'Design a lesson plan such that the objective of the lesson is very clearly stated and each activity is connected to the objective.',
          },
        ],
        buttonLabel: 'Rate participation',
      },
    ],
    introduction: [
      {
        image: FirstStepImage,
        title: 'Introduction',
        subtitle:
          'This unit is about clearly stating the objectives of the lesson and connecting them to the lesson activities.',
        buttonLabel: 'Next',
      },
      {
        image: SecondStepImage,
        title:
          'Why is it useful to clearly state the objectives of the lesson?',
        subtitle:
          'It is important that the students know what is the objective of the day’s lesson.Without knowing the objective, the students will not be able to understand why they are studying the topic and how it is related to the different activities.',
        buttonLabel: 'Next',
      },
    ],
    situational: [
      {
        title: 'Situational examples',
        subtitle:
          'Read out loud the examples below and ask the questions for the teachers',
        evaluativeList: [
          {
            icon: 'comment',
            title: 'Example 1',
            description:
              'The teacher enters the classroom and asks the students to open their books on page 11 and start reading. The teacher then tells them that in 15 minutes he will ask them questions about what they are reading and then in the group they will explain what they have read.',
          },
          {
            icon: 'comment',
            title: 'Example 2',
            description:
              'The teacher enters the classroom and asks the students to open their books on page 11 and start reading. The teacher then tells them that in 15 minutes he will ask them questions about what they are reading and then in the group they will explain what they have read.',
            box: {
              title: 'Discuss the following question',
              description:
                'Do you think the students are very clear about what they are learning?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Check explanation',
      },
    ],
    explanation: [
      {
        title: 'Explanation',
        subtitle:
          'Let the teachers know what was bad and what was good in the examples',
        evaluativeList: [
          {
            icon: 'badExample',
            title: 'Example 1',
            description:
              'In the first exchange, the words that the teacher uses are not supporting and encouraging for the student. The student will not feel good after hearing the words and will not be motivated to work hard. A teacher should try to be supportive to the students so students can work harder.',
          },
          {
            icon: 'goodExample',
            title: 'Example 2',
            description:
              'In the second example the teacher first says the objective of the lesson and then also writes it on the board. The teacher then assigns the task and connects it with the objective of the lesson. This makes it clear to the students what is the objective of the lesson and how the activity is connected to it.',
          },
        ],
      },
    ],
  },
  {
    title: 'Unit 3',
    description: 'Checking for understanding',
    activities: [
      {
        title: 'Activity 1',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',
        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Take out your books and notebooks. And start copying what I am writing on the board.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'When you have written let me know.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'We are done sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Okay, now you have 5 minutes to prepare and I will take a test.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Next',
      },
      {
        title: 'Activity 2',
        subtitle:
          'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',

        chat: [
          {
            messages: [
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Hello class. Today we will learn about double digital multiplication and how we can do double digit multiplication. I am also writing the objective on the board, please take out your note books and first note the objective on your notebooks.',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'I am writing two questions of double digit multiplication on the board. Also, please pay attention as I solve these questions. Then you copy them in the notebook',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'Okay sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message: 'Are there any questions?',
              },
              {
                sender: 'Student',
                color: '#FFFFFF',
                message: 'No sir.',
              },
              {
                sender: 'Teacher',
                color: '#C2E0FF',
                message:
                  'Okay, I am writing two more questions of double digit multiplication this time I want you to do them on your copies. You can ask me any question you want.',
              },
            ],
            box: {
              title: 'Discuss the following question',
              description:
                'How do you think the student will feel? How do you think they will behave?',
              icon: 'question-circle-solid',
              iconColor: '#3373CC',
            },
          },
        ],
        buttonLabel: 'Check response',
      },
      {
        title: 'Response',
        evaluativeList: [
          {
            icon: 'comments',
            title: 'Activity 1',
            description:
              'No, the teacher was not supportive of the student. The teacher didn’t use positive words when the student was unable to give the right answer. Because of this the student stopped trying and feels that he cannot have the right answer.',
          },
          {
            icon: 'comments',
            title: 'Activity 2',
            description:
              'The second example is very good as the teacher first explains the topic, writes it on the board and then asks the students to also write the topic on their copies. The teacher then explains the questions and reminds students that these are both double digit multiplication questions. Then the teacher gives tasks to the students and asks them to perform double digit multiplication. By doing all this, the teacher has made sure the students know what is the objective of the lesson and then also connects each activity to the objective.',
            box: {
              title: "What's next?",
              description:
                'For the tasks the teachers are going to exercise some positive words to be used in the classroom',
              icon: 'info-circle-solid',
              iconColor: '#7A0CE8',
              bgColor: '#F5ECFE',
            },
          },
        ],
        buttonLabel: 'Start task',
      },
      {
        title: 'Tasks',
        evaluativeList: [
          {
            icon: 'comments',
            title: 'Task 1',
            description:
              'Design a lesson plan such that the objective of the lesson is very clearly stated and each activity is connected to the objective.',
          },
        ],
        buttonLabel: 'Rate participation',
      },
    ],
    introduction: [
      {
        image: FirstStepImage,
        title: 'Introduction',
        subtitle:
          'This unit is about using questions and other strategies to check for understanding.',
        buttonLabel: 'Next',
      },
      {
        image: SecondStepImage,
        title:
          'Why is it useful to clearly state the objectives of the lesson?',
        subtitle:
          'As teachers, we need to check if students are understanding what we expect them to learn. We need to check learning throughout the lesson because if we wait until the end of the lesson or until students are tested, it is too late to help students if they don’t understand. We will likely end up in a scenario in which only few students follow the lesson while others are distracted and unable to catch up.',
        buttonLabel: 'Next',
      },
    ],
    situational: [
      {
        title: 'Situational examples',
        subtitle:
          'Read out loud the examples below and ask the questions for the teachers',
        chat: [
          {
            messages: [
              {
                color: '#C2E0FF',
                message: 'Is a cat a living thing or a non-living thing?',
                sender: 'Teacher',
              },
              {
                color: '#FFFFFF',
                message: 'Living',
                sender: 'Student',
              },
              {
                color: '#C2E0FF',
                message: 'Is a table a living thing or a non-living thing?',
                sender: 'Teacher',
              },
              {
                color: '#FFFFFF',
                message: 'Non-living',
                sender: 'Student',
              },
            ],
            box: {
              title: 'Avoid binary questions',
              description:
                'Asking ‘Do you understand?’, “is that so?” or any question that has a binary answer and not following-up with questions is a bad strategy for checking for understanding because students can get the right answer by guessing and are unlikely to tell you when they don’t understand.',
              bgColor: '#FEEDEC',
              icon: 'ban',
              iconColor: '#F11D0E',
            },
          },
          {
            messages: [
              {
                color: '#C2E0FF',
                message: 'Is a plant a living thing or a non-living thing?',
                sender: 'Teacher',
              },
              {
                color: '#FFFFFF',
                message: 'Living',
                sender: 'Student',
              },
              {
                color: '#C2E0FF',
                message:
                  'Tell me more… Why do you think a plan is a living thing?',
                sender: 'Teacher',
              },
              {
                color: '#FFFFFF',
                message: 'Because it grows',
                sender: 'Student',
              },
            ],
            box: {
              title: 'Investigate how students are thinking',
              description:
                'A good way to check for understanding reveals what students know (or don’t know) and helps teachers make decisions about what to do next.',
              bgColor: '#218225',
              icon: 'check-circle',
              iconColor: '#F11D0E',
            },
          },
        ],

        buttonLabel: 'Check explanation',
      },
    ],
    explanation: [
      {
        title: 'Explanation',
        subtitle:
          'Let the teachers know what was bad and what was good in the examples',
        evaluativeList: [
          {
            icon: 'badExample',
            title: 'Example 1',
            description:
              'In the first exchange, the words that the teacher uses are not supporting and encouraging for the student. The student will not feel good after hearing the words and will not be motivated to work hard. A teacher should try to be supportive to the students so students can work harder.',
          },
          {
            icon: 'goodExample',
            title: 'Example 2',
            description:
              'In the second example the teacher first says the objective of the lesson and then also writes it on the board. The teacher then assigns the task and connects it with the objective of the lesson. This makes it clear to the students what is the objective of the lesson and how the activity is connected to it.',
          },
        ],
      },
    ],
  },
];

export default units;
