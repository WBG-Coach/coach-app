import React from 'react';
import Page from '../../../components/Page';
import LoadingBar from '../LoadingBar';
import {useTranslation} from 'react-i18next';
import {Button, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import AvaliativeList from '../../../components/AvaliativeList';
import {AvaliativeItem} from '../../../components/AvaliativeList/types';

const items: AvaliativeItem[] = [
  {
    icon: 'badExample',
    title: 'Bad example',
    description:
      'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and starts telling him that ‘you are not a good student’, ‘you never do your work’ or ‘you cannot do this work’.',
    box: {
      title: 'Discuss the following question',
      description:
        'How do you think the student will feel? How do you think they will behave?',
    },
  },
  {
    icon: 'goodExample',
    title: 'Good example',
    description:
      'The teacher teaches a concept to the class and gives them classwork. The teacher notices that one student is not able to do the work assigned to him. The teacher goes to the student and tells him ‘you are a great student and if you try harder you can do this’',
    box: {
      title: 'Discuss the following question',
      description:
        'How do you think the student will feel? How do you think they will behave?',
    },
  },
];

const TLCSituations = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          Situational examples
        </Text>
        <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          Read out loud the examples below and ask the questions for the
          teachers
        </Text>

        <AvaliativeList items={items} />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.explanation)}>
        {t('tlc.situations.button')}
      </Button>
    </Page>
  );
};

export default TLCSituations;
