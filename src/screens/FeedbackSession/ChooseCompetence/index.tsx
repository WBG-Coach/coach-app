import React, {useCallback, useEffect, useState} from 'react';
import {Center, HStack, ScrollView, Text, VStack} from 'native-base';
import {SessionService} from '../../../services/session.service';
import {CompetenceAnalytics} from '../../../types/competence';
import {useLocation, useNavigate} from 'react-router-native';
import StarsTag from '../../../components/StarsTag';
import Button from '../../../components/Button';
import PathRoutes from '../../../routers/paths';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';
import Icon from '../../../components/Icon';

const FeedbackSessionChooseCompetence: React.FC = () => {
  const [selectedCompetence, setSelectedCompetence] =
    useState<CompetenceAnalytics>();
  const [competencies, setCompetencies] = useState<CompetenceAnalytics[]>([]);
  const {t} = useTranslation();
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
              {t('feedback.preparation.teachingPratice', {
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
          <Center
            w="24px"
            h="24px"
            mr="1px"
            borderWidth="1px"
            borderRadius="4px"
            borderColor="primary.200"
            bg={
              selectedCompetence?.id === competence.id ? 'primary.200' : 'white'
            }>
            <Icon name="check" color="white" />
          </Center>
        </HStack>
      </TouchableOpacity>
    ),
    [selectedCompetence, t],
  );

  const goToFeedbackForm = () => {
    navigate(PathRoutes.feedbackSession.form, {
      replace: true,
      state: {competence: selectedCompetence, ...state},
    });
  };

  return (
    <Page back title={t('feedbackSession.title')}>
      <VStack flex={1}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
            {t('feedback.preparation.title')}
          </Text>
          <Text mt={2} fontSize={'TMD'} fontWeight={400} color={'gray.700'}>
            {t('feedback.preparation.subtitle')}
          </Text>

          <VStack mt={7} space={5}>
            {competencies.map(renderCompetenceItem)}
          </VStack>
        </ScrollView>
      </VStack>

      <Button
        mt={3}
        marginTop={'auto'}
        isDisabled={!selectedCompetence}
        onPress={goToFeedbackForm}>
        {t('feedback.preparation.button')}
      </Button>
    </Page>
  );
};

export default FeedbackSessionChooseCompetence;
