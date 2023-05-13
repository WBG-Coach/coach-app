import {
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import {isTablet as Tablet} from 'react-native-device-info';
import React, {useContext, useEffect, useState} from 'react';
import Teacher from '../../database/models/Teacher';
import {getWatermelon} from '../../database';
import {UserContext} from '../../providers/contexts/UserContext';
import {Q} from '@nozbe/watermelondb';
import Session from '../../database/models/Session';
import Feedback from '../../database/models/Feedback';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';

const PendingSessions: React.FC = () => {
  const {user} = useContext(UserContext);
  const [teachers, setTeachers] = useState({
    isLoading: true,
    data: [] as Teacher[],
  });

  useEffect(() => {
    if (user && user.school) {
      (async () => {
        const db = await getWatermelon();
        const allTeachers = await db.collections
          .get<Teacher>('teacher')
          .query(Q.where('school_id', user?.school?.id as string))
          .fetch();

        const teachersWithSessions = await Promise.all(
          allTeachers.map(async teacher => ({
            ...teacher,
            image: await teacher.image.fetch(),
            sessions: await Promise.all(
              ((await teacher.sessions.fetch()) as Session[]).map(
                async session => ({
                  ...session,
                  feedbacks: await session.feedbacks.fetch(),
                }),
              ),
            ),
          })),
        );

        const data = teachersWithSessions.reduce((acc, item) => {
          if (
            item.sessions.find(session => (session.feedbacks as any).length < 1)
          ) {
            return [...acc, {...(item as any)._raw, image: item.image}];
          }

          return acc;
        }, [] as Teacher[]);

        setTeachers({isLoading: false, data});
      })();
    }
  }, []);

  const isTablet = Tablet();

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      {teachers.isLoading ? (
        <Center flex={1} bg={'white'}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <VStack flex={1}>
          <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
            Pending sessions
          </Text>
          <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'} mb={2}>
            Complete the feedback sessions with the following teachers
          </Text>
          <FlatList
            data={teachers.data}
            renderItem={({item}) => (
              <TouchableOpacity>
                <HStack py={4} alignItems={'center'}>
                  <Image
                    source={{uri: item.image.value}}
                    alt={'Teacher image'}
                    w={isTablet ? '56px' : '40px'}
                    h={isTablet ? '56px' : '40px'}
                    borderRadius={'500px'}
                  />
                  <VStack ml={2} space={0} flex={1}>
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'}>
                      {item.name}
                    </Text>
                    <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                      Feedback pending
                    </Text>
                  </VStack>

                  <HStack>
                    <Icon name={'exclamation-circle-solid'} color={'#E89F0C'} />
                    <Icon name={'angle-right'} />
                  </HStack>
                </HStack>
              </TouchableOpacity>
            )}
          />
        </VStack>
      )}
    </VStack>
  );
};

export default PendingSessions;
