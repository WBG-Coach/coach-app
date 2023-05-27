import {isTablet as Tablet} from 'react-native-device-info';
import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Competence from '../../../../database/models/Competence';
import {getWatermelon} from '../../../../database';
import Icon from '../../../../components/base/Icon';
import Navigation from '../../../../services/navigation';
import Routes from '../../../../routes/paths';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Q} from '@nozbe/watermelondb';
import Answer from '../../../../database/models/Answer';
import Session from '../../../../database/models/Session';
import {UserContext} from '../../../../providers/contexts/UserContext';
import Question from '../../../../database/models/Question';
import {LineChart} from 'react-native-gifted-charts';

type competenceWithAnswers = {
  answersValue: number[];
  isCrescent: boolean;
} & Partial<Competence>;

const TeacherStatsTab = () => {
  const {teacher} = useContext(UserContext);
  const isTablet = Tablet();
  const theme = useTheme();
  const [competences, setCompetences] = useState({
    isLoading: true,
    data: undefined as competenceWithAnswers[] | undefined,
  });

  useEffect(() => {
    (async () => {
      if (teacher) {
        const db = await getWatermelon();

        const sessionsDb = (
          await db.collections
            .get<Session>('session')
            .query(Q.where('teacher_id', teacher?.id))
            .fetch()
        ).map(session => session.id);

        const competencesDb = await db.collections
          .get<Competence>('competence')
          .query()
          .fetch();

        const competencesWithSum = await Promise.all(
          competencesDb.map(async competence => {
            const questionsDb = (
              await db.collections
                .get<Question>('question')
                .query(Q.where('competence_id', competence.id))
                .fetch()
            ).map(question => question.id);

            const answers = (
              await db.collections
                .get<Answer>('answer')
                .query(
                  Q.and(
                    Q.where('session_id', Q.oneOf(sessionsDb)),
                    Q.where('question_id', Q.oneOf(questionsDb)),
                  ),
                )
                .fetch()
            ).reduce(
              (acc, item) => ({
                ...acc,
                [item.session_id]: (acc?.session_id || 0) + item.value,
              }),
              {} as any,
            );

            const answersValue = Object.keys(answers).map(key => answers[key]);

            const isCrescent =
              answersValue[answersValue.length - 1] >=
              answersValue[answersValue.length - 2];

            return {
              ...competence._raw,
              answersValue: answersValue.splice(
                answersValue.length - 3,
                answersValue.length,
              ),
              isCrescent,
            } as competenceWithAnswers;
          }),
        );
        console.log(competencesWithSum[1]);

        setCompetences({isLoading: false, data: competencesWithSum});
      }
    })();
  }, []);

  const averageAnswers =
    (competences?.data?.reduce(
      (acc, item) => acc + item.answersValue[item.answersValue.length - 1],
      0,
    ) || 0) / (competences?.data?.length || 0);

  console.log('->', averageAnswers);

  return (
    <VStack flex={1} py={6} px={isTablet ? '64px' : 4}>
      {competences.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
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
            {/*   <Image
              source={
                chartData.find(
                  (el, i) =>
                    averageAnswers >= el.start &&
                    averageAnswers < chartData[i + 1]?.start,
                )?.image
              }
              alt={'Graph'}
            /> */}
            <Text
              mt={6}
              textAlign={'center'}
              fontSize={'TMD'}
              fontWeight={500}
              color={'gray.600'}>
              The current rating is: Almost there
            </Text>
            <Text
              mt={2}
              textAlign={'center'}
              fontSize={'TSM'}
              fontWeight={400}
              color={'gray.600'}>
              This rating is the average of all 5 Teaching Practices in the last
              observation
            </Text>
          </VStack>

          <Text mt={8} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            Teacher's evolution
          </Text>
          <Text mt={1} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            Comparison presenting the teacher's improvement through coach
            sessions
          </Text>

          <FlatList
            mt={4}
            data={competences.data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(Routes.teacher.competenceStats, {
                    competence_id: item.id,
                  })
                }>
                <HStack w={'100%'} alignItems={'center'} position={'relative'}>
                  <VStack flex={1}>
                    <Text
                      mt={8}
                      fontSize={'LSM'}
                      fontWeight={500}
                      color={'gray.700'}>
                      {index + 1}. {item.title}
                    </Text>
                    <HStack alignItems={'center'}>
                      <Icon
                        size={14}
                        name={item.isCrescent ? 'arrow-growth' : 'chart-down'}
                        color={
                          item.isCrescent
                            ? theme.colors.green['200']
                            : theme.colors.red['200']
                        }
                      />
                      <Text
                        ml={1}
                        fontSize={'LSM'}
                        fontWeight={400}
                        color={'gray.700'}>
                        {item.isCrescent ? 'Improved' : 'Needs work'}
                      </Text>
                      <Text
                        fontSize={'TXS'}
                        fontWeight={400}
                        color={'gray.600'}>
                        since last session
                      </Text>
                    </HStack>
                    <HStack ml={3} alignItems={'center'}>
                      <Text
                        ml={1}
                        fontSize={'LSM'}
                        fontWeight={500}
                        color={'primary.200'}>
                        See details
                      </Text>
                      <Icon
                        size={14}
                        name={'angle-right'}
                        color={theme.colors.primary['200']}
                      />
                    </HStack>
                  </VStack>

                  <Box position={'absolute'} right={0} top={12}>
                    <LineChart
                      isAnimated
                      thickness={2}
                      maxValue={5}
                      color={item.isCrescent ? '#31C436' : '#E80C76'}
                      animateOnDataChange
                      animationDuration={1400}
                      onDataChangeAnimationDuration={300}
                      areaChart
                      curved
                      data={item.answersValue.map(value => ({value} as any))}
                      startFillColor={item.isCrescent ? '#31C436' : '#E80C76'}
                      endFillColor={item.isCrescent ? '#31C436' : '#E80C76'}
                      startOpacity={0.4}
                      endOpacity={0.1}
                      spacing={90 / item.answersValue.length}
                      width={90}
                      height={40}
                      initialSpacing={10}
                      yAxisColor="white"
                      xAxisColor="white"
                      hideDataPoints={true}
                      hideYAxisText={true}
                    />
                  </Box>
                </HStack>
              </TouchableOpacity>
            )}
          />

          <Button
            mt={8}
            variant={'solid'}
            borderRadius={'8px'}
            alignSelf={'center'}
            color={'white'}
            background={'white'}
            borderWidth={'1px'}
            borderColor={'primary.200'}
            onPress={() =>
              Navigation.navigate('WithCompetenceContext', {
                screen: Routes.classObservation.onboarding,
              })
            }>
            <HStack alignItems={'center'} space={3}>
              <Icon name={'plus'} color={theme.colors.primary['200']} />
              <Text color={'primary.200'}>New class observation</Text>
            </HStack>
          </Button>
        </>
      )}
    </VStack>
  );
};

export default TeacherStatsTab;
