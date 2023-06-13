import {isTablet as Tablet} from 'react-native-device-info';
import {FlatList, HStack, Text, View, VStack} from 'native-base';
import React, {useState} from 'react';
import Session from '../../../../../database/models/Session';
import Competence from '../../../../../database/models/Competence';
import {getWatermelon} from '../../../../../database';
import moment from 'moment';
import StarView from '../../../../../components/StarView';
import {getTags} from '../../../../../components/StarsTag/common';
import {useTranslation} from 'react-i18next';
import Icon from '../../../../../components/base/Icon';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Navigation from '../../../../../services/navigation';
import Routes from '../../../../../routes/paths';
import Answer from '../../../../../database/models/Answer';
import {useFocusEffect} from '@react-navigation/native';

type Props = {
  route: {
    params: {
      session_id: Session['id'];
    };
  };
};

type SessionWithRelations = Omit<Session, 'questions'> & {
  overall_rating: number;
  competences: Competence[];
};

const SessionViewerScreen: React.FC<any> = ({route: {params}}: Props) => {
  const isTablet = Tablet();
  const {t} = useTranslation();
  const [session, setSession] = useState({
    isLoading: true,
    data: {} as SessionWithRelations,
  });

  useFocusEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const sessionDb = (await db.collections
        .get<Session>('session')
        .find(params.session_id)) as Session;

      const answers = (await sessionDb.answers.fetch()).reduce(
        (acc, item) => [...acc, item._raw as any],
        [] as Answer[],
      );

      const answersSum = answers?.reduce(
        (acc, item: any) => acc + item.value,
        0,
      );

      setSession({
        isLoading: false,
        data: {
          ...(sessionDb._raw as any),
          answers,
          feedback: (await sessionDb.feedback.fetch())[0],
          overall_rating: Math.round(answersSum / answers.length),
        },
      });
    })();
  });

  const options = [
    {
      icon: 'clipboard-notes',
      label: 'Observation',
      onPress: () =>
        Navigation.navigate(Routes.teacher.observationViewer, {
          answers: session.data.answers,
        }),
    },
    {
      icon: 'comment-verify',
      label: 'Feedback',
      onPress: !(session.data.feedback as any)?.id
        ? () =>
            Navigation.navigate(Routes.feedback.mentoringSection, {
              params: {
                session_id: session.data.id,
              },
            })
        : () =>
            Navigation.navigate(Routes.teacher.feedbackViewer, {
              feedback_id: (session.data.feedback as any)?.id,
            }),
    },
  ];

  return (
    <VStack flex={1} background={'gray.100'} space={1}>
      <VStack px={isTablet ? '64px' : 4} background={'white'}>
        <HStack alignItems={'center'} w={'100%'} py={6}>
          <VStack flex={1} space={2} alignItems={'flex-start'}>
            <Text
              textAlign={'center'}
              fontSize={'HXS'}
              fontWeight={600}
              color={'gray.700'}>
              {t('teacher.tabs.session.session') || 'Session'} 2
            </Text>
            <Text
              textAlign={'center'}
              fontSize={'TMD'}
              fontWeight={400}
              color={'gray.700'}>
              {moment(
                new Date(new Date((session.data as any).created_at)),
              ).format('DD MMM, YYYY - HH:mm')}
            </Text>
          </VStack>
          <VStack alignItems={'flex-end'} space={1}>
            <StarView maxLength={5} value={session.data.overall_rating} />
            <Text
              textAlign={'center'}
              fontSize={'TMD'}
              fontWeight={400}
              color={'gray.600'}>
              {getTags(t)[session.data.overall_rating - 1]?.label}
            </Text>
          </VStack>
        </HStack>
      </VStack>

      <VStack
        px={isTablet ? '64px' : 4}
        py={6}
        background={'white'}
        alignItems={'flex-start'}
        flex={1}>
        <Text
          textAlign={'center'}
          fontSize={'LMD'}
          fontWeight={500}
          color={'gray.700'}>
          {t('teacher.tabs.session.selectCoach') || 'Select coaching part'}
        </Text>
        <Text
          mt={1}
          textAlign={'center'}
          fontSize={'TXS'}
          fontWeight={400}
          color={'gray.600'}>
          {t('teacher.tabs.session.viewSummary') ||
            'You can view the summary of the observation or the feedback you had with the teacher'}
        </Text>

        <VStack flex={1} mt={4} w={'100%'}>
          <FlatList
            data={options}
            flex={1}
            ItemSeparatorComponent={() => <View h={2} />}
            renderItem={({item}) => (
              <TouchableOpacity onPress={item.onPress}>
                <HStack
                  borderBottomWidth={'1px'}
                  borderBottomColor={'gray.200'}
                  flex={1}
                  py={3}
                  alignItems={'center'}>
                  <HStack flex={1} space={2} alignItems={'center'}>
                    <Icon name={item.icon} />
                    <Text
                      textAlign={'center'}
                      fontSize={'LMD'}
                      fontWeight={500}
                      color={'gray.700'}>
                      {item.label}
                    </Text>
                  </HStack>
                  <Icon name={'angle-right'} />
                </HStack>
              </TouchableOpacity>
            )}
          />
        </VStack>
      </VStack>
    </VStack>
  );
};

export default SessionViewerScreen;
