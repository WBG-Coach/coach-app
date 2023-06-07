import {
  Center,
  FlatList,
  HStack,
  Spinner,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React, {useContext, useCallback, useState, useEffect} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';
import {
  TeachersWithSession,
  UserContext,
} from '../../providers/contexts/UserContext';
import Navigation from '../../services/navigation';
import Routes from '../../routes/paths';
import {isTablet as Tablet} from 'react-native-device-info';
import {getWatermelon} from '../../database';
import Teacher from '../../database/models/Teacher';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import {Q} from '@nozbe/watermelondb';
import Session from '../../database/models/Session';
import EmptyStateComponent from './EmptyState';
import HorizontalMenu from './HorizontalMenu';
import HomeHeader from './HomeHeader';
import TeacherItem from './TeacherItem';

const HomeScreen = () => {
  const {user} = useContext(UserContext);
  const {t} = useTranslation();
  const theme = useTheme();
  const isTablet = Tablet();
  const [teachers, setTeachers] = useState({
    isLoading: true,
    data: [] as [] | TeachersWithSession[],
  });

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const db = await getWatermelon();
        const allTeachers = await db.collections
          .get<Teacher>('teacher')
          .query(
            Q.take(10),
            Q.where('school_id', Q.eq(user?.school?.id as string)),
          )
          .fetch();

        const teachersUpdated: TeachersWithSession[] = await Promise.all(
          allTeachers.map(async teacher => {
            const sessions = (await teacher.sessions.fetch()) as Session[];
            const feedbacksLength = (
              await Promise.all(
                sessions.map(async session => ({
                  ...session,
                  feedbacks: await session.feedback.fetch(),
                })),
              )
            ).reduce((acc, item) => acc + (item.feedbacks as any).length, 0);

            return {
              ...teacher._raw,
              sessions,
              feedbacksLength: feedbacksLength,
              image: (await teacher.image.fetch())?._raw,
            } as any;
          }),
        );

        setTeachers({isLoading: false, data: teachersUpdated});
      })();
    }, []),
  );

  const selectTeacher = (teacher: TeachersWithSession) => {};

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      <HomeHeader />

      <HorizontalMenu />

      <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
        {t('home.teachers.title')}
      </Text>

      {teachers.isLoading ? (
        <Center flex={1} bg={'white'}>
          <Spinner size={'lg'} />
        </Center>
      ) : (
        <>
          {teachers.data.length < 1 ? (
            <Center flex={1}>
              <EmptyStateComponent
                handleCreate={() => Navigation.navigate(Routes.teacher.create)}
              />
            </Center>
          ) : (
            <VStack flex={1} pb={4}>
              <FlatList
                keyExtractor={({id}) => id}
                data={teachers.data}
                mb={5}
                renderItem={({item}) => (
                  <TeacherItem
                    teacher={item}
                    onPress={() => selectTeacher(item)}
                  />
                )}
              />

              <TouchableOpacity
                onPress={() => Navigation.navigate(Routes.teacher.create)}>
                <HStack alignSelf={'center'} space={3} alignItems={'center'}>
                  <Icon name={'plus'} color={theme.colors.primary[200]} />
                  <Text color={'primary.200'}>{t('home.teachers.addNew')}</Text>
                </HStack>
              </TouchableOpacity>
            </VStack>
          )}
        </>
      )}
    </VStack>
  );
};

export default HomeScreen;
