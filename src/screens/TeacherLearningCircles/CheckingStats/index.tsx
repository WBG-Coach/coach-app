import React, {useCallback, useContext, useEffect, useState} from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import LoadingBar from '../LoadingBar';
import {
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {useCoachContext} from '../../../providers/coach.provider';
import {chartData} from '../../Teacher/TeacherDetails/Tabs/TeacherStats/common';
import {getTags} from '../../../components/StarsTag/common';
import {SchoolService} from '../../../services/school.service';
import CompetenceService from '../../../services/competence.service';
import {AnswerService} from '../../../services/answer.service';
import {Competence} from '../../../types/competence';
import StarView from '../../../components/StarView';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import EmptyState from './EmptyState';

type competenceWithAnswers = {
  answersAverage: number;
} & Partial<Competence>;

const TLCCheckingStats: React.FC = () => {
  const navigate = useNavigate();
  const {currentSchool} = useCoachContext();
  const [schoolData, setSchoolData] = useState({
    data: {competences: [] as competenceWithAnswers[], average: 0},
    isLoading: true,
  });
  const {t} = useTranslation();
  const tags = getTags(t);

  const refreshSchool = useCallback(async () => {
    if (currentSchool?.id) {
      const sessionIds = (
        await SchoolService.findSessionFromSchool(currentSchool?.id, 999, 0)
      ).map(session => session.id);

      const competences =
        await CompetenceService.listCompetenciesWithQuestions();

      const competencesWithSum = await Promise.all(
        competences.map(async competence => {
          const questionIds = competence.questions.map(({id}) => id);

          const answers = (
            await AnswerService.listBySessionsAndQuestions(
              sessionIds,
              questionIds,
            )
          ).reduce(
            (acc, item) => ({
              ...acc,
              [item.session_id]: (acc?.session_id || 0) + item.value,
            }),
            {} as any,
          );

          const answersAverage = Object.keys(answers).map(
            key => answers[key],
          ) as number[];

          return {
            ...competence,
            answersAverage:
              answersAverage.reduce((acc, item) => acc + item, 0) /
              answersAverage.length,
          } as competenceWithAnswers;
        }),
      );

      const average =
        competencesWithSum.reduce((acc, item) => acc + item.answersAverage, 0) /
        competencesWithSum.length;

      setSchoolData({
        isLoading: false,
        data: {competences: competencesWithSum, average},
      });
    }
  }, []);

  useEffect(() => {
    refreshSchool();
  }, [refreshSchool]);

  console.log('->', schoolData.data.average);

  return schoolData.isLoading ? (
    <Center flex={1} w="full">
      <Spinner color="blue" size="lg" />
    </Center>
  ) : (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <Text fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
        {currentSchool?.name}
      </Text>

      {schoolData.data.average ? (
        <>
          {' '}
          <Text fontSize={'LMD'} fontWeight={500} mt={6} color={'gray.800'}>
            {t('tlc.checkingStats.title')}
          </Text>
          <VStack
            w={'100%'}
            mt={4}
            borderRadius={'16px'}
            bg={'gray.100'}
            px={4}
            py={6}
            alignItems={'center'}>
            <Image
              source={
                chartData.find(i => schoolData.data.average <= i.start)?.image
              }
              alt={'Graph'}
            />
            <HStack>
              <Text
                mt={6}
                textAlign={'center'}
                fontSize={'TMD'}
                fontWeight={500}
                color={'gray.600'}>
                {t('teacher.tabs.stats.currentRating') ||
                  'The current rating is:'}{' '}
              </Text>
              <Text
                mt={6}
                textAlign={'center'}
                fontSize={'TMD'}
                fontWeight={500}
                color={'gray.700'}>
                {tags[parseInt(schoolData.data.average.toFixed(0))]?.label}
              </Text>
            </HStack>
            <Text
              mt={2}
              textAlign={'center'}
              fontSize={'TSM'}
              fontWeight={400}
              color={'gray.600'}>
              {t('tlc.checkingStats.graphDesc')}
            </Text>
          </VStack>
          <Text mt={8} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {t('tlc.checkingStats.ratingTitle')}
          </Text>
          <Text mt={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('tlc.checkingStats.ratingDesc')}
          </Text>
          <FlatList
            data={schoolData.data.competences}
            renderItem={({item}) => (
              <HStack
                flex={1}
                pt={3}
                justifyContent={'space-between'}
                alignItems={'center'}
                mt={4}>
                <Text
                  fontSize={'LMD'}
                  fontWeight={500}
                  color={'gray.700'}
                  maxW={'200px'}>
                  {item.title}
                </Text>
                <StarView maxLength={5} showLabel value={item.answersAverage} />
              </HStack>
            )}
          />
        </>
      ) : (
        <Center flex={1}>
          <EmptyState />
        </Center>
      )}

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => navigate(PathRoutes.teacherLearningCircles.unitSelect)}>
        {t('tlc.checkingStats.button')}
      </Button>
    </Page>
  );
};

export default TLCCheckingStats;
