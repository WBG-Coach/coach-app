import React, {useState} from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, ScrollView, Text, VStack, useTheme} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import Chat from '../../../components/Chat';
import {ChatMessage} from '../../../components/Chat/types';
import TipBox from '../../../components/AvaliativeList/TipBox';
import AvaliativeList from '../../../components/AvaliativeList';
import {AvaliativeItem} from '../../../components/AvaliativeList/types';
import {Props as TipBoxProps} from '../../../components/AvaliativeList/TipBox/types';

const TLCActivities = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();

  const activitiePages: {
    title: string;
    description: string;
    messages?: ChatMessage[];
    items?: AvaliativeItem[];
    box?: TipBoxProps;
  }[] = [
    {
      title: 'Activity 1',
      description:
        'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',
      messages: [
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message: 'Can anyone tell me, what is 3 multiplied by 9?',
        },
        {
          sender: 'Student',
          color: 'white',
          message: '20',
        },
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message: 'Wrong. You are never able to give the right answer',
        },
        {
          sender: 'Student',
          color: 'white',
          message: 'Sorry sir',
        },
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message: 'What sorry? You are a very bad student.',
        },
      ],

      box: {
        title: 'Discuss the following question',
        description:
          'How do you think the student will feel? How do you think they will behave?',
      },
    },
    {
      title: 'Activity 2',
      description:
        'Assume that in a Grade 3 Mathematics lesson, students are learning about multiplication and division. The teacher gives a question of multiplication for students to solve.',
      messages: [
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message: 'Can anyone tell me what is 5 Multiplied by 3 is?',
        },
        {
          sender: 'Student',
          color: 'white',
          message: '10',
        },
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message:
            'No. But try again, you are very good student I am sure if you think you can give the right answer. Remember when we discussed the table of 5.',
        },
        {
          sender: 'Student',
          color: 'white',
          message: 'Yes sir',
        },
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message: 'So when we multiple 5 with 3 what is the answer?',
        },
        {
          sender: 'Student',
          color: 'white',
          message: '15',
        },
        {
          sender: 'Teacher',
          color: theme.colors.primary[100],
          message:
            'Yes! Very good. See I told you that if you try you will get the right answer. You are a very good student of the class just like all the other students.',
        },
      ],

      box: {
        title: 'Discuss the following question',
        description:
          'How do you think the student will feel? How do you think they will behave?',
      },
    },
    {
      title: 'Response',
      description: '',

      items: [
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
            'We think that example 2 is a very good way of supporting students in the classroom. The student is encouraged even when he/she gives a wrong answer. And with a little support the student is able to try and give the right answer.',
        },
      ],
    },
    {
      title: 'Tasks',
      description: '',

      items: [
        {
          icon: 'tasks',
          title: 'Task 1',
          description:
            'Each teacher must write 10 positive words that they will use in their lesson in future.',
        },
        {
          icon: 'tasks',
          title: 'Task 2',
          description:
            'Each participant must share any 2 words they have written in task 1',
        },
      ],
    },
  ];

  const pageData = activitiePages[currentStep];

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      {pageData.messages ? (
        <ScrollView flex={1}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {pageData.title}
          </Text>
          <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {pageData.description}
          </Text>

          <Chat messages={pageData.messages} />

          {pageData.box && <TipBox {...pageData.box} />}
        </ScrollView>
      ) : (
        pageData.items && (
          <>
            <Text fontSize={'HSM'} mb={6} fontWeight={600} color={'gray.700'}>
              {pageData.title}
            </Text>
            <AvaliativeList items={pageData.items} />
          </>
        )
      )}

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() =>
          currentStep !== activitiePages.length - 1
            ? setCurrentStep(currentStep + 1)
            : navigate(PathRoutes.teacherLearningCircles.finish)
        }>
        {t('tlc.activities.button')}
      </Button>
    </Page>
  );
};

export default TLCActivities;
