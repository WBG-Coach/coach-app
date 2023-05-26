import {Q} from '@nozbe/watermelondb';
import {Center, FlatList, HStack, Spinner, Text, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {getWatermelon} from '../../../../../database';
import Answer from '../../../../../database/models/Answer';
import Competence from '../../../../../database/models/Competence';
import Question from '../../../../../database/models/Question';
import Session from '../../../../../database/models/Session';
import {UserContext} from '../../../../../providers/contexts/UserContext';
import {isTablet as Tablet} from 'react-native-device-info';
import moment from 'moment';
import StarView from '../../../../../components/StarView';
import {getTags} from '../../../../../components/StarsTag/common';
import {useTranslation} from 'react-i18next';

type Props = {
  route: {
    params: {
      competence_id: Competence['id'];
    };
  };
};

const CompetenceStats: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {teacher} = useContext(UserContext);
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
      if (teacher) {
        const db = await getWatermelon();

        const sessionsDb = await db.collections
          .get<Session>('session')
          .query(Q.where('teacher_id', teacher.id))
          .fetch();

        const questions = (
          await db.collections
            .get<Question>('question')
            .query(Q.where('competence_id', params.competence_id))
            .fetch()
        ).map(question => question.id);

        const sessions = await Promise.all(
          sessionsDb.map(async session => {
            const answers = (
              await db.collections
                .get<Answer>('answer')
                .query(Q.where('session_id', session.id))
                .fetch()
            ).filter(answer => questions.includes(answer.question_id));

            return {
              created_at: (session._raw as any).created_at,
              overall_rating: Math.round(
                answers.reduce((acc, item) => acc + item.value, 0) / 4,
              ),
            };
          }),
        );

        setSessions({
          data: sessions,
          isLoading: false,
        });
      }
    })();
  }, []);

  console.log(sessions);

  return (
    <VStack px={isTablet ? '64px' : 4} mt={6} flex={1}>
      {sessions.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
            Rating per session
          </Text>

          <Text fontSize={'TSM'} mt={1} fontWeight={400} color={'gray.600'}>
            Comparison presenting the teacher's improvement through coach
            sessions
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
                    Session {index + 1}
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
                    textAlign={'right'}
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
    </VStack>
  );
};

export default CompetenceStats;
