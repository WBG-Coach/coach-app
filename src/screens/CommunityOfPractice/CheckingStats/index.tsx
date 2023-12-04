import React, {useCallback, useContext, useEffect, useState} from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import {
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  View,
} from 'native-base';
import {useCoachContext} from '../../../providers/coach.provider';
import {chartData} from '../../Teacher/TeacherDetails/Tabs/TeacherStats/common';
import {SchoolService} from '../../../services/school.service';
import CompetenceService from '../../../services/competence.service';
import {AnswerService} from '../../../services/answer.service';
import {Competence} from '../../../types/competence';
import {useNavigate, useParams} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import EmptyState from './EmptyState';
import TabButton from '../../../components/TabButton';
import CompetenceItem from './CompetenceItem';

export type CompetenceWithAnswers = {
  answersAverage: number;
} & Partial<Competence>;

const COPCheckingStats: React.FC = () => {
  const navigate = useNavigate();
  const {currentSchool} = useCoachContext();
  const [schoolData, setSchoolData] = useState({
    data: {competences: [] as CompetenceWithAnswers[], average: 0},
    isLoading: true,
  });
  const params = useParams();
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const {t} = useTranslation();

  const tabs = [
    {
      data: schoolData.data.competences.filter(
        competence => competence.answersAverage >= 4,
      ),
      label: 'cop.checkingStats.keys.tab_positive',
    },
    {
      data: schoolData.data.competences.filter(
        competence => competence.answersAverage < 4,
      ),
      label: 'cop.checkingStats.keys.tab_negative',
    },
  ];

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
          } as CompetenceWithAnswers;
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

  return schoolData.isLoading ? (
    <Center flex={1} w="full">
      <Spinner color="blue" size="lg" />
    </Center>
  ) : (
    <Page setting back title={t('cop.checkingStats.page_title')}>
      <Text fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
        {t('cop.checkingStats.title')}
      </Text>

      <Text fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
        {t('cop.checkingStats.subtitle')}
      </Text>

      {schoolData.data.average ? (
        <>
          <Text fontSize={'LMD'} fontWeight={500} mt={6} color={'gray.800'}>
            {t('cop.checkingStats.chart.title')}
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
                fontWeight={400}
                color={'gray.600'}>
                {t('cop.checkingStats.chart.average_title')}{' '}
              </Text>
              <Text
                mt={6}
                textAlign={'center'}
                fontSize={'TMD'}
                fontWeight={700}
                color={'gray.700'}>
                {schoolData?.data?.average.toFixed(1)}/5
              </Text>
            </HStack>
            <Text
              mt={2}
              textAlign={'center'}
              fontSize={'TSM'}
              fontWeight={400}
              color={'gray.600'}>
              {t('cop.checkingStats.chart.average_subitle')}
            </Text>
          </VStack>

          <Text mt={8} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {t('cop.checkingStats.keys.title')}
          </Text>
          <Text mt={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('cop.checkingStats.keys.subtitle')}
          </Text>

          <HStack
            mb={2}
            borderBottomWidth={'2px'}
            borderBottomColor={'gray.200'}>
            {tabs.map((item, index) => (
              <TabButton
                key={index}
                label={item.label}
                onPress={() => setSelectedTabIndex(index)}
                isActive={selectedTabIndex === index}
              />
            ))}
          </HStack>

          <FlatList
            data={tabs[selectedTabIndex].data}
            mb={4}
            ItemSeparatorComponent={() => <View h={2} />}
            renderItem={({item}) => <CompetenceItem {...item} />}
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
        onPress={() => navigate(PathRoutes.communityOfPractice.insights)}>
        {t('cop.checkingStats.button')}
      </Button>
    </Page>
  );
};

export default COPCheckingStats;
