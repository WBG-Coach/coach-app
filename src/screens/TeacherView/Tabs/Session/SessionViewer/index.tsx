import {isTablet as Tablet} from 'react-native-device-info';
import {HStack, Text, VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import Session from '../../../../../database/models/Session';
import Competence from '../../../../../database/models/Competence';
import {getWatermelon} from '../../../../../database';
import {Q} from '@nozbe/watermelondb';
import moment from 'moment';

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
  const [session, setSession] = useState({
    isLoading: true,
    data: {} as SessionWithRelations,
  });

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const sessionDb = (await db.collections
        .get<Session>('session')
        .find(params.session_id)) as Session;

      const answers = await sessionDb.answers.fetch();
      const answersSum = answers?.reduce(
        (acc, item: any) => acc + item._raw.value,
        0,
      );

      setSession({
        isLoading: false,
        data: {
          ...(sessionDb._raw as any),
          overall_rating: Math.round(answersSum / answers.length),
        },
      });
    })();
  }, []);

  return (
    <VStack flex={1} background={'gray.100'}>
      <VStack px={isTablet ? '64px' : 4} background={'white'}>
        <HStack alignItems={'center'} w={'100%'} py={6}>
          <VStack flex={1} alignItems={'flex-start'}>
            <Text
              textAlign={'center'}
              fontSize={'HXS'}
              fontWeight={600}
              color={'gray.700'}>
              Session 2
            </Text>
            <Text
              textAlign={'center'}
              fontSize={'HXS'}
              fontWeight={600}
              color={'gray.700'}>
              {moment().format('')}
            </Text>
          </VStack>
          <VStack></VStack>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SessionViewerScreen;
