import {
  Button,
  HStack,
  Text,
  TextArea,
  VStack,
  Spinner,
  Center,
} from 'native-base';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {ScrollView} from 'react-native-gesture-handler';
import Icon from '../../../components/base/Icon';
import {isTablet as Tablet} from 'react-native-device-info';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {CompetenceContext} from '../../../providers/contexts/CompetencesContext';
import CompetenceAccordion from './CompetenceAccordion';
import Session from '../../../database/models/Session';
import {useTranslation} from 'react-i18next';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      session: Session;
    };
  };
};

const ObservationForm: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {competences} = useContext(CompetenceContext);

  const [loading, setLoading] = useState(true);
  const [keyPoints, setKeyPoints] = useState('');
  const [answers, setAnswers] = useState<{[key: string]: number}>({});
  const [competenciesFinished, setCompetenciesFinished] = useState<string[]>(
    [],
  );

  const isDisable = useMemo(
    () => competenciesFinished.length < competences.length,
    [competenciesFinished, competences],
  );

  useFocusEffect(() => {
    setTimeout(() => {
      setLoading(false);
    });
  });

  const handleSubmitForm = async () => {
    const formattedAnswers = Object.keys(answers).map(question_id => ({
      question_id,
      value: answers[question_id],
    }));

    Navigation.navigate(Routes.classObservation.formConfirmation, {
      answers: formattedAnswers,
      session: {...params.session, key_points: keyPoints},
    });
  };

  if (loading)
    return (
      <Center bg="white" w="full" h="full">
        <Spinner size="lg" />
      </Center>
    );

  return (
    <VStack
      py={6}
      flex={1}
      bg={'gray.0'}
      safeAreaBottom
      px={isTablet ? '64px' : 4}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('classObservation.form.title') || 'Class evaluation'}
        </Text>
        <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
          {t('classObservation.form.subtitle') ||
            'Rate each topic with your observation'}
        </Text>

        {competences.map(competence => (
          <CompetenceAccordion
            key={competence.id}
            competence={competence}
            isFinished={competenciesFinished.includes(competence.id)}
            onComplete={() =>
              setCompetenciesFinished(state => [...state, competence.id])
            }
            handleAnswer={answers => {
              setAnswers(state => ({...state, ...answers}));
            }}
          />
        ))}

        <VStack py={4}>
          <Text fontSize={'TXL'} fontWeight={700} color={'gray.700'}>
            {t('classObservation.form.keyPoints') ||
              'Key points to be discussed'}
          </Text>
          <Text mt={4} fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
            {t('classObservation.form.pointsToDiscuss') ||
              'What you want to discuss with the teacher?'}
          </Text>

          <TextArea
            mt={2}
            value={keyPoints}
            autoCompleteType={'off'}
            onChangeText={setKeyPoints}
            placeholder={'Positive and negative points'}
          />

          <Text mt={2} fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
            {t('classObservation.form.spaceAdditional')}
          </Text>
        </VStack>
      </ScrollView>

      <HStack
        mb={3}
        py={1}
        space={1}
        alignItems={'center'}
        background={'#FEF8EC'}
        px={isTablet ? '64px' : 4}
        mx={isTablet ? '-64px' : -4}>
        <Icon name="star" color={'#9B6908'} size={20} />
        <Text fontSize={'TSM'} fontWeight={400} color={'#9B6908'}>
          {t('classObservation.form.competenciesRated', {
            count: competenciesFinished.length,
            total: competences.length,
          })}
        </Text>
      </HStack>

      <Button
        color={'white'}
        variant={'solid'}
        marginTop={'auto'}
        borderRadius={'8px'}
        onPress={handleSubmitForm}
        background={'primary.200'}
        isDisabled={isDisable}
        _disabled={{
          background: '#F2F4F7',
          _text: {color: '#9AA2AC'},
          opacity: 1,
        }}>
        {t('classObservation.form.button') || 'Finish observation'}
      </Button>
    </VStack>
  );
};

export default ObservationForm;
