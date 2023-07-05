import {Checkbox, HStack, ScrollView, Text, VStack} from 'native-base';
import {useLocation, useNavigate} from 'react-router-native';
import {isTablet as Tablet} from 'react-native-device-info';
import StarsTag from '../../../components/StarsTag';
import React, {useCallback, useEffect, useState} from 'react';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import {CompetenceAnalytics} from '../../../types/competence';
import {SessionService} from '../../../services/session.service';

const FeedbackSessionChooseCompetence: React.FC = () => {
  const [selectedCompetence, setSelectedCompetence] =
    useState<CompetenceAnalytics>();
  const [competencies, setCompetencies] = useState<CompetenceAnalytics[]>([]);
  const {t} = useTranslation();
  const isTablet = Tablet();
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    SessionService.getSessionAnswersGroupedByCompetence(state.sessionId).then(
      setCompetencies,
    );
  }, [state]);

  const renderCompetenceItem = useCallback(
    (competence: CompetenceAnalytics, index: number) => (
      <TouchableOpacity
        key={competence.id}
        onPress={() =>
          !selectedCompetence
            ? setSelectedCompetence(competence)
            : selectedCompetence.id === competence.id &&
              setSelectedCompetence(undefined)
        }>
        <HStack alignItems={'center'}>
          <VStack flex={1} space={2}>
            <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              {competence.title}
            </Text>
            <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
              {t('feedback.feedbackPreparation.teachingPratice', {
                index: index + 1,
              })}
            </Text>

            <HStack space={1}>
              <StarsTag
                value={
                  competence.sumAnswers /
                  competence.totalQuestions /
                  competence.questionsScale
                }
              />
            </HStack>
          </VStack>

          <Checkbox
            size={'md'}
            color={'white'}
            value={competence.title}
            aria-label={`${competence.title} checkbox`}
            isChecked={competence.id === selectedCompetence?.id}
            isDisabled={
              selectedCompetence && competence.id !== selectedCompetence.id
            }
          />
        </HStack>
      </TouchableOpacity>
    ),
    [selectedCompetence, t],
  );

  return (
    <Page back title={t('feedbackSession.title')}>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.feedbackPreparation.title') ||
              'Choose teaching practices'}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.feedbackPreparation.subtitle') ||
              'Choose 1 teaching practices to work with the teacher'}
          </Text>

          <VStack mt={7} space={5}>
            {competencies.map(renderCompetenceItem)}
          </VStack>
        </ScrollView>
      </VStack>

      <VStack
        pt={3}
        background={'white'}
        px={isTablet ? '32px' : 4}
        borderRadius={'8px 8px 0px 0px'}>
        <Button
          isDisabled={!selectedCompetence}
          onPress={() =>
            navigate(PathRoutes.feedbackSession.form, {
              replace: true,
              state: {competence: selectedCompetence, ...state},
            })
          }
          marginTop={'auto'}>
          {t('feedback.feedbackPreparation.button')}
        </Button>
      </VStack>
    </Page>
  );
};

export default FeedbackSessionChooseCompetence;
