import {isTablet as Tablet} from 'react-native-device-info';
import {
  Button,
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {needsWorkLow} from '../../../../assets/images/teacherStats/indicator';
import Competence from '../../../../database/models/Competence';
import {getWatermelon} from '../../../../database';
import Icon from '../../../../components/base/Icon';
import {low} from '../../../../assets/images/teacherStats/graphSmall';
import Navigation from '../../../../services/navigation';
import Routes from '../../../../routes/paths';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Q} from '@nozbe/watermelondb';
import Answer from '../../../../database/models/Answer';
import Session from '../../../../database/models/Session';
import {UserContext} from '../../../../providers/contexts/UserContext';
import Question from '../../../../database/models/Question';

const TeacherStatsTab = () => {
  const {teacher} = useContext(UserContext);
  const isTablet = Tablet();
  const theme = useTheme();
  const [competences, setCompetences] = useState({
    isLoading: true,
    data: undefined as Competence[] | undefined,
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

        await Promise.all(
          competencesDb.map(async competence => {
            const questions = (
              await db.collections
                .get<Question>('question')
                .query(Q.where('competence_id', competence.id))
                .fetch()
            ).map(question => question.id);

            const answers = (
              await db.collections.get<Answer>('answer').query().fetch()
            ).filter(
              answer =>
                questions.includes(answer.question_id) &&
                sessionsDb.includes(answer.session_id),
            );

            console.log('-->', answers);
          }),
        );

        /*         await Promise.all(sessionsDb.map(async session => {
            const answers = (
                await db.collections
                  .get<Answer>('answer')
                  .query(Q.where('session_id', session.id))
                  .fetch()
              ).filter(answer => questions.includes(answer.question_id));
        })); */

        /*             await Promise.all(
              competencesDb.map(async competence => {
                const competenceWithQuestions = {
                  ...competence,
                  questions: await competence.questions.fetch(),
                };
      
                const answers = (
                  await db.collections
                    .get<Answer>('answer')
                    .query(Q.where('session_id', session.id))
                    .fetch()
                ).filter(answer => questions.includes(answer.question_id));
      
              }),
            ); */

        setCompetences({isLoading: false, data: competencesDb});
      }
    })();
  }, []);

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
            <Image source={needsWorkLow} alt={'Graph'} />
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
            data={competences.data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                onPress={() =>
                  Navigation.navigate(Routes.teacher.competenceStats, {
                    competence_id: item.id,
                  })
                }>
                <HStack w={'100%'} alignItems={'center'}>
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
                        name={'arrow-growth'}
                        color={theme.colors.green['200']}
                      />
                      <Text
                        ml={1}
                        fontSize={'LSM'}
                        fontWeight={400}
                        color={'gray.700'}>
                        Improved{' '}
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

                  <Image source={low} alt={'Graph'} />
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
