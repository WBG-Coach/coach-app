import {
  Center,
  FlatList,
  HStack,
  Image as CImage,
  Spinner,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useCallback, useState} from 'react';
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

const HomeScreen = () => {
  const {user, setTeacher, handleSwitchSchool, handleSwitchProfile} =
    useContext(UserContext);
  const {t} = useTranslation();
  const theme = useTheme();
  const isTablet = Tablet();
  const [teachers, setTeachers] = useState({
    isLoading: true,
    data: [] as [] | TeachersWithSession[],
  });

  const data = [
    {
      icon: 'plus',
      label: t('home.items.newSession'),
      onPress: () => Navigation.navigate(Routes.quickAccess.newSession),
    },
    {
      icon: 'comment-dots',
      label: t('home.items.pendingSession'),
      onPress: () => Navigation.navigate(Routes.pendingSessions),
    },
    {
      icon: 'university',
      label: t('home.items.switchSchools'),
      onPress: handleSwitchSchool,
    },
    {
      icon: 'user',
      label: 'Switch coach profile',
      onPress: handleSwitchProfile,
    },
    {
      icon: 'chart-line',
      label: t('home.items.statics'),
      onPress: () => Navigation.navigate(Routes.quickAccess.stats),
    },
  ];

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const db = await getWatermelon();
        const allTeachers = await db.collections
          .get<Teacher>('teacher')
          .query(Q.where('school_id', Q.eq(user?.school?.id as string)))
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

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      flex={1}>
      <HStack space={2} alignItems={'center'}>
        <Center
          w={isTablet ? '64px' : '56px'}
          h={isTablet ? '64px' : '56px'}
          borderRadius={'500px'}
          background={'primary.100'}>
          <Icon name={'university'} />
        </Center>

        <VStack space={1}>
          <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
            {user?.school?.name}
          </Text>
          <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
            {teachers.data.length >= 1
              ? t('home.teachersLength').replace(
                  '$teacherslength',
                  teachers.data.length.toString(),
                )
              : t('home.noTeachersLength')}
          </Text>
        </VStack>
      </HStack>

      <HStack mt={6}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({label}) => label}
          ItemSeparatorComponent={() => <View w={'8px'} />}
          renderItem={({item}) => (
            <VStack
              borderRadius={'16px'}
              borderWidth={'1px'}
              alignItems={'center'}
              borderColor={'gray.300'}
              maxW={isTablet ? '176px' : '130px'}>
              <TouchableOpacity onPress={item.onPress}>
                <VStack p={'12px 8px'} space={2}>
                  <Center
                    py={isTablet ? 6 : 3}
                    px={isTablet ? '64px' : 9}
                    borderRadius={'8px'}
                    background={'primary.100'}>
                    <Icon name={item.icon} color={'#264673'} />
                  </Center>

                  <Text
                    fontSize={'TSM'}
                    color={'gray.800'}
                    fontWeight={400}
                    textAlign={'center'}>
                    {item.label}
                  </Text>
                </VStack>
              </TouchableOpacity>
            </VStack>
          )}
        />
      </HStack>

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
                  <TouchableOpacity
                    onPress={() => {
                      setTeacher(item as any);
                      Navigation.navigate(Routes.teacher.teacher);
                    }}>
                    <HStack
                      py={3}
                      px={4}
                      w={'100%'}
                      alignItems={'center'}
                      borderBottomWidth={'1px'}
                      borderBottomColor={'gray.300'}>
                      <HStack flex={1} space={2} alignItems={'center'}>
                        <Center
                          w={isTablet ? '56px' : '40px'}
                          h={isTablet ? '56px' : '40px'}
                          borderRadius={'500px'}
                          background={'primary.100'}>
                          {item?.image?.value ? (
                            <CImage
                              source={{uri: item.image.value}}
                              alt={'Teacher image'}
                              w={'100%'}
                              h={'100%'}
                              borderRadius={'500px'}
                            />
                          ) : (
                            <Icon name={'user'} />
                          )}
                        </Center>

                        <VStack space={1}>
                          <Text
                            fontSize={'LLG'}
                            fontWeight={500}
                            color={'gray.800'}>
                            {item.name}
                          </Text>
                          <Text
                            fontSize={'TSM'}
                            fontWeight={500}
                            color={'gray.700'}>
                            {item.subject}
                          </Text>

                          <HStack space={1}>
                            {item.sessions.length >= 1 ? (
                              <HStack
                                alignItems={'center'}
                                borderRadius={'4px'}
                                background={'primary.100'}
                                px={2}
                                py={1}
                                space={1}>
                                <Icon
                                  name={'clipboard-notes-solid'}
                                  size={15}
                                />
                                <Text
                                  fontSize={'TSM'}
                                  fontWeight={500}
                                  color={'gray.700'}>
                                  {item.sessions.length}{' '}
                                  {item.sessions.length > 1
                                    ? t('home.teachers.sessions')
                                    : t('home.teachers.session')}
                                </Text>
                              </HStack>
                            ) : (
                              <HStack
                                alignItems={'center'}
                                borderRadius={'4px'}
                                background={'yellow.100'}
                                px={2}
                                py={1}
                                space={1}>
                                <Icon
                                  name={'favorite-solid'}
                                  size={15}
                                  color={theme.colors.yellow['300']}
                                />
                                <Text
                                  fontSize={'TSM'}
                                  fontWeight={500}
                                  color={'yellow.300'}>
                                  New teacher
                                </Text>
                              </HStack>
                            )}

                            {(item as any).feedbacksLength >= 1 && (
                              <HStack
                                alignItems={'center'}
                                borderRadius={'4px'}
                                background={'green.100'}
                                px={2}
                                py={1}
                                space={1}>
                                <Icon name={'comment-verify-solid'} size={15} />
                                <Text
                                  fontSize={'TSM'}
                                  fontWeight={500}
                                  color={'gray.700'}>
                                  {(item as any).feedbacksLength} Feedbacks
                                </Text>
                              </HStack>
                            )}
                          </HStack>
                        </VStack>
                      </HStack>
                      <Icon name={'angle-right'} />
                    </HStack>
                  </TouchableOpacity>
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
