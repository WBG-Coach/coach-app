import React, {useContext, useEffect, useState} from 'react';
import {Props} from './types';

import {
  Center,
  FlatList,
  HStack,
  Spinner,
  Text,
  View,
  VStack,
} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-gifted-charts';
import {getTags} from '../../../../../../../components/StarsTag/common';
import {SessionService} from '../../../../../../../services/session.service';
import {QuestionService} from '../../../../../../../services/question.service';
import {AnswerService} from '../../../../../../../services/answer.service';
import StarView from '../../../../../../../components/StarView';

const screenWidth = Dimensions.get('window').width;
const isTablet = Tablet();

const CompetenceCharts: React.FC<Props> = ({competence_id, teacher_id}) => {
  const {t} = useTranslation();
  const tags = getTags(t);
  const [sessions, setSessions] = useState({
    isLoading: true,
    data: undefined as
      | {
          created_at: any;
          overall_rating: number;
        }[]
      | undefined,
  });

  useEffect(() => {
    (async () => {
      setSessions({
        data: undefined,
        isLoading: true,
      });

      const sessionsDb = await SessionService.findSessionFromTeacher(
        teacher_id,
        999,
        0,
      );

      const questions = (
        await QuestionService.listQuestionsByCompetence(competence_id)
      ).map(({id}) => id);

      const sessions = await Promise.all(
        sessionsDb.map(async session => {
          const answers = await AnswerService.listBySessionsAndQuestions(
            [session.id],
            questions,
          );

          return {
            created_at: session.created_at,
            overall_rating: Math.round(
              answers.reduce((acc, item) => acc + parseInt(item.value), 0) /
                answers.length,
            ),
          };
        }),
      );

      setSessions({
        data: sessions,
        isLoading: false,
      });
    })();
  }, [competence_id]);

  const customDataPoint = () => {
    return (
      <View
        style={{
          width: 20,
          height: 20,
          backgroundColor: 'white',
          borderWidth: 4,
          borderRadius: 10,
          borderColor: '#07BAD1',
        }}
      />
    );
  };

  const lineData = sessions?.data?.map((session, i) => ({
    value: session.overall_rating,
    dataPointText: session.overall_rating,
    label: i + 1,
    customDataPoint,
  }));

  return (
    <>
      {sessions.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          <LineChart
            isAnimated
            thickness={4}
            maxValue={5}
            color="#07BAD1"
            noOfSections={4}
            animateOnDataChange
            animationDuration={1000}
            onDataChangeAnimationDuration={300}
            areaChart
            curved
            yAxisTextStyle={{color: 'lightgray'}}
            yAxisTextNumberOfLines={1}
            data={lineData as any}
            startFillColor={'rgb(84,219,234)'}
            endFillColor={'rgb(84,219,234)'}
            startOpacity={0.4}
            endOpacity={0.1}
            spacing={(screenWidth - 270) / (lineData as any)?.length}
            width={isTablet ? screenWidth - 270 : screenWidth - 90}
            initialSpacing={10}
            yAxisColor="lightgray"
            xAxisColor="lightgray"
            dataPointsHeight={20}
            dataPointsWidth={20}
            {...(isTablet && {
              yAxisLabelTexts: tags.map(tag => tag.label),
              yAxisLabelWidth: 120,
            })}
          />
          <Text mt={6} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            {t('teacher.tabs.stats.ratingPerSession') || 'Rating per session'}
          </Text>
          <Text fontSize={'TSM'} mt={1} fontWeight={400} color={'gray.600'}>
            {t('teacher.tabs.stats.teacherComparision') ||
              "Comparison presenting the teacher's improvement through coach sessions"}
          </Text>
          <FlatList
            data={sessions.data}
            renderItem={({item, index}) => (
              <HStack
                alignItems={'center'}
                w={'100%'}
                py={3}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.200'}>
                <VStack flex={1}>
                  <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                    {t('teacher.tabs.stats.sessionName') || 'Session'}{' '}
                    {index + 1}
                  </Text>
                  <Text
                    mt={2}
                    fontSize={'TSM'}
                    fontWeight={400}
                    color={'gray.600'}>
                    {moment(new Date((item as any).created_at)).format(
                      'DD MMM, YYYY - HH:mm',
                    )}
                  </Text>
                </VStack>

                <VStack>
                  <StarView maxLength={5} value={item.overall_rating} />

                  <Text
                    mt={2}
                    fontSize={'TSM'}
                    fontWeight={400}
                    color={'gray.600'}>
                    {getTags(t)[item.overall_rating - 1]?.label}
                  </Text>
                </VStack>
              </HStack>
            )}
          />
        </>
      )}
    </>
  );
};

export default CompetenceCharts;
