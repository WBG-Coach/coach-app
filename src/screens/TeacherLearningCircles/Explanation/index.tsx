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
      'In the first exchange, the words that the teacher uses are not supporting and encouraging for the student. The student will not feel good after hearing the words and will not be motivated to work hard. A teacher should try to be supportive to the students so students can work harder.',
  },
  {
    icon: 'goodExample',
    title: 'Good example',
    description:
      'In the second example the teacher sees that the student is finding it difficult to work and then tries to support him by saying positive words and encouraging them.',
  },
];

const TLCExplanation = () => {
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
          Explanation
        </Text>
        <Text mb={8} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          Let the teachers know what was bad and what was good in the examples
        </Text>

        <AvaliativeList items={items} />
      </VStack>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.activities)}>
        {'tlc.explanation.button'}
      </Button>
    </Page>
  );
};

export default TLCExplanation;
