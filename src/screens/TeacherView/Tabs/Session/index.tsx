import {
  Text,
  Image,
  Button,
  Center,
  VStack,
  HStack,
  useTheme,
  Spinner,
  ScrollView,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {SessionDefault} from '../../../../assets/images/logos';
import Icon from '../../../../components/base/Icon';
import {getWatermelon} from '../../../../database';
import Session from '../../../../database/models/Session';
import Routes from '../../../../routes/paths';
import Navigation from '../../../../services/navigation';
import {isTablet as Tablet} from 'react-native-device-info';
import StarsTag from '../../../../components/StarsTag';
import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import {useTranslation} from 'react-i18next';
import Answer from '../../../../database/models/Answer';
import {Q} from '@nozbe/watermelondb';
import {UserContext} from '../../../../providers/contexts/UserContext';

export type SessionWithAnswers = Omit<Session, 'answers'> & {
  overall_rating: number;
  answers: Answer[];
  feedbackPending: boolean;
};

const SessionTab: React.FC = () => {
  const theme = useTheme();
  const isTablet = Tablet();
  const {t} = useTranslation();
  const {teacher} = useContext(UserContext);
  const [sessions, setSessions] = useState({
    isLoading: true,
    data: [] as [] | SessionWithAnswers[],
  });

  useEffect(() => {
    if (teacher) {
      (async () => {
        const db = await getWatermelon();
        const list = await db.collections
          .get<Session>('session')
          .query(Q.where('teacher_id', teacher.id))
          .fetch();

        const sessions: SessionWithAnswers[] = await Promise.all(
          list.map(async session => {
            const answers = await session.answers.fetch();
            const feedbacks = await session.feedback.fetch();
            const answersSum = answers?.reduce(
              (acc, item: any) => acc + item._raw.value,
              0,
            );

            return {
              ...session._raw,
              overall_rating: Math.round(answersSum / answers.length),
              feedbackPending: feedbacks.length < 1,
            } as any;
          }),
        );

        setSessions({
          isLoading: false,
          data: sessions,
        });
      })();
    }
  }, []);

  return (
    <VStack flex={1}>
      {sessions.isLoading ? (
        <Center flex={1}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          {sessions.data.length >= 1 ? (
            <VStack flex={1} px={isTablet ? '64px' : 4}>
              {sessions.data[sessions.data.length - 1].feedbackPending && (
                <HStack background={'yellow.100'} p={4} space={2}>
                  <Icon
                    name={'exclamation-circle'}
                    color={theme.colors.yellow['300']}
                  />
                  <VStack flex={1} alignItems={'baseline'}>
                    <Text fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
                      Pending feedback session
                    </Text>
                    <Text
                      mt={2}
                      fontSize={'TSM'}
                      fontWeight={400}
                      color={'gray.700'}>
                      You still haven't done the feedback of the last class
                      observation with this teacher
                    </Text>

                    <Button
                      onPress={() =>
                        Navigation.navigate('WithCompetenceContext', {
                          screen: Routes.feedback.mentoringSection,
                          params: {
                            session_id:
                              sessions.data[sessions.data.length - 1].id,
                          },
                        })
                      }
                      mt={3}
                      borderColor={'white'}
                      background={'white'}>
                      <Text color={'primary.200'}>Start feedback now</Text>
                    </Button>
                  </VStack>
                </HStack>
              )}

              <ScrollView flexGrow={0} mt={'24px'}>
                {sessions.data.map((item, index) => (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      Navigation.navigate(Routes.teacher.sessionViewer, {
                        session_id: item.id,
                      })
                    }>
                    <HStack
                      w={'100%'}
                      py={3}
                      alignItems={'center'}
                      borderBottomWidth={'1px'}
                      borderBottomColor={'gray.200'}>
                      <VStack flex={1} space={2} alignItems={'flex-start'}>
                        <Text
                          fontSize={'LMD'}
                          fontWeight={500}
                          color={'gray.700'}>
                          {t('teacher.tabs.session.session')} {index + 1}
                        </Text>
                        <Text
                          fontSize={'TSM'}
                          fontWeight={400}
                          color={'gray.500'}>
                          {moment(new Date((item as any).created_at)).format(
                            'DD MMM, YYYY - HH:mm',
                          )}
                        </Text>

                        <StarsTag value={item.overall_rating - 1} />
                      </VStack>
                      <HStack space={1}>
                        {item.feedbackPending && (
                          <Icon
                            name={'exclamation-circle-solid'}
                            color={theme.colors.yellow['200']}
                          />
                        )}

                        <Icon name={'angle-right'} />
                      </HStack>
                    </HStack>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <Button
                mt={8}
                variant={'outline'}
                borderRadius={'8px'}
                borderColor={theme.colors.primary['200']}
                onPress={() =>
                  Navigation.navigate('WithCompetenceContext', {
                    screen: Routes.classObservation.about,
                  })
                }>
                <HStack alignItems={'center'}>
                  <Icon name={'plus'} color={theme.colors.primary['200']} />
                  <Text
                    ml={3}
                    textAlign={'center'}
                    fontSize={'TMD'}
                    fontWeight={500}
                    color={'primary.200'}>
                    {t('teacher.tabs.session.newClassObservation')}
                  </Text>
                </HStack>
              </Button>
            </VStack>
          ) : (
            <Center flex={1}>
              <VStack alignItems={'center'}>
                <Image source={SessionDefault} alt={'Session default image'} />
                <Text
                  mt={8}
                  fontSize={'HXS'}
                  fontWeight={600}
                  color={'gray.800'}>
                  {t('teacher.tabs.session.stillNoSession')}
                </Text>
                <Text
                  textAlign={'center'}
                  mt={2}
                  fontSize={'TMD'}
                  fontWeight={400}
                  color={'gray.700'}>
                  {t('teacher.tabs.session.stillNoSessionDescription')}
                </Text>

                <Button
                  mt={8}
                  variant={'outline'}
                  borderRadius={'8px'}
                  borderColor={theme.colors.primary['200']}
                  onPress={() =>
                    Navigation.navigate('WithCompetenceContext', {
                      screen: Routes.classObservation.about,
                    })
                  }>
                  <HStack alignItems={'center'}>
                    <Icon name={'plus'} color={theme.colors.primary['200']} />
                    <Text
                      ml={3}
                      textAlign={'center'}
                      fontSize={'TMD'}
                      fontWeight={500}
                      color={'primary.200'}>
                      {t('teacher.tabs.session.newClassObservation')}
                    </Text>
                  </HStack>
                </Button>
              </VStack>
            </Center>
          )}
        </>
      )}
    </VStack>
  );
};

export default SessionTab;
