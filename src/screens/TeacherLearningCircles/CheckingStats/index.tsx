import React, {useCallback, useContext, useEffect, useState} from 'react';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import LoadingBar from '../LoadingBar';
import {HStack, Image, Text, VStack} from 'native-base';
import {useCoachContext} from '../../../providers/coach.provider';
import {chartData} from '../../Teacher/TeacherDetails/Tabs/TeacherStats/common';
import {getTags} from '../../../components/StarsTag/common';
import {SchoolService} from '../../../services/school.service';
import CompetenceService from '../../../services/competence.service';
import {AnswerService} from '../../../services/answer.service';
import {Competence} from '../../../types/competence';

type competenceWithAnswers = {
  answersAverage: number;
} & Partial<Competence>;

const TLCCheckingStats: React.FC = () => {
  const {currentSchool} = useCoachContext();
  const [schoolData, setSchoolData] = useState({
    data: [] as competenceWithAnswers[],
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

      console.log(competencesWithSum);
    }
  }, []);

  useEffect(() => {
    refreshSchool();
  }, [refreshSchool]);

  return (
    <Page
      setting
      back
      title={t('tlc.page_title')}
      beforePageEl={<LoadingBar />}>
      <Text fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
        {currentSchool?.name}
      </Text>

      <Text fontSize={'LMD'} fontWeight={500} mt={6} color={'gray.800'}>
        Overall rating
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
          source={chartData.find(i => 3 <= i.start)?.image}
          alt={'Graph'}
        />
        <HStack>
          <Text
            mt={6}
            textAlign={'center'}
            fontSize={'TMD'}
            fontWeight={500}
            color={'gray.600'}>
            {t('teacher.tabs.stats.currentRating') || 'The current rating is:'}{' '}
          </Text>
          <Text
            mt={6}
            textAlign={'center'}
            fontSize={'TMD'}
            fontWeight={500}
            color={'gray.700'}>
            {tags[4]?.label}
          </Text>
        </HStack>
        <Text
          mt={2}
          textAlign={'center'}
          fontSize={'TSM'}
          fontWeight={400}
          color={'gray.600'}>
          This rating is the average of the school in all Teaching Practices
        </Text>
      </VStack>

      <Text mt={8} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
        Rating per Teaching Practice
      </Text>
      <Text mt={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
        How is the average of the school in each Teaching Practice
      </Text>
    </Page>
  );
};

export default TLCCheckingStats;
