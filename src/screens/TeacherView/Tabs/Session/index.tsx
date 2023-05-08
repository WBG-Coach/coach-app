import {
  Text,
  Image,
  Button,
  Center,
  VStack,
  HStack,
  useTheme,
  Spinner,
  Box,
  ScrollView,
} from 'native-base';
import React, {useEffect, useState} from 'react';
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

export type SessionWithAnswers = Omit<Session, 'answers'> & {
  overall_rating: number;
};

const SessionTab: React.FC = () => {
  const theme = useTheme();
  const isTablet = Tablet();
  const {t} = useTranslation();
  const [sessions, setSessions] = useState({
    isLoading: true,
    data: [] as [] | SessionWithAnswers[],
  });

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const list = await db.collections.get<Session>('session').query().fetch();

      const sessions: SessionWithAnswers[] = await Promise.all(
        list.map(async session => {
          const questions = await session.answers.fetch();
          const questionSum = questions?.reduce(
            (acc, item: any) => acc + item._raw.value,
            0,
          );

          return {
            ...session._raw,
            overall_rating: Math.round(questionSum / questions.length),
          } as any;
        }),
      );

      setSessions({
        isLoading: false,
        data: sessions,
      });
    })();
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
            <VStack flex={1} px={isTablet ? '64px' : 4} mt={'24px'}>
              <ScrollView flexGrow={0}>
                {sessions.data.map((item, index) => (
                  <TouchableOpacity key={item.id}>
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

                        <StarsTag value={item.overall_rating} />
                      </VStack>
                      <Box>
                        <Icon name={'angle-right'} />
                      </Box>
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
                    screen: Routes.classObservation.onboarding,
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
                      screen: Routes.classObservation.onboarding,
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
