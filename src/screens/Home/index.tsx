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
import {getWatermelon, syncWatermelon} from '../../database';
import Teacher from '../../database/models/Teacher';
import {useFocusEffect} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

const HomeScreen = () => {
  const {user, setTeacher} = useContext(UserContext);
  const {t} = useTranslation();
  const theme = useTheme();
  const isTablet = Tablet();
  const [teachers, setTeachers] = useState({
    isLoading: true,
    data: [] as [] | TeachersWithSession[],
  });

  const data = [
    {
      icon: 'graph-bar',
      label: t('home.items.newSession'),
      onPress: () => {},
    },
    {
      icon: 'university',
      label: t('home.items.switchSchools'),
      onPress: () => {},
    },
    {
      icon: 'wifi-slash',
      label: t('home.items.offlineSync'),
      onPress: async () => {
        await syncWatermelon();
      },
    },
    {
      icon: 'plus',
      label: t('home.items.statics'),
      onPress: () => {},
    },
  ];

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const db = await getWatermelon();
        const allTeachers = await db.collections
          .get<Teacher>('teacher')
          .query()
          .fetch();

        const teachersUpdated: TeachersWithSession[] = await Promise.all(
          allTeachers.map(
            async teacher =>
              ({
                ...teacher._raw,
                sessions: await teacher.sessions.fetch(),
                image: (await teacher.image.fetch())._raw,
              } as any),
          ),
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
        <CImage
          src={user?.school?.image_url}
          alt={'School image'}
          w={isTablet ? '64px' : '56px'}
          h={isTablet ? '64px' : '56px'}
          borderRadius={'500px'}
        />

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
            <></>
          ) : (
            <VStack>
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
                        <CImage
                          source={{uri: item.image.value}}
                          alt={'Teacher image'}
                          w={isTablet ? '56px' : '40px'}
                          h={isTablet ? '56px' : '40px'}
                          borderRadius={'500px'}
                        />

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
                            <HStack
                              alignItems={'center'}
                              borderRadius={'4px'}
                              background={'green.100'}
                              px={2}
                              py={1}
                              space={1}>
                              <Icon name={'thumbs-up'} size={15} />
                              <Text
                                fontSize={'TSM'}
                                fontWeight={500}
                                color={'gray.700'}>
                                1
                              </Text>
                            </HStack>

                            <HStack
                              alignItems={'center'}
                              borderRadius={'4px'}
                              background={'red.100'}
                              px={2}
                              py={1}
                              space={1}>
                              <Icon name={'thumbs-up'} size={15} />
                              <Text
                                fontSize={'TSM'}
                                fontWeight={500}
                                color={'gray.700'}>
                                1
                              </Text>
                            </HStack>

                            <HStack
                              alignItems={'center'}
                              borderRadius={'4px'}
                              background={'primary.100'}
                              px={2}
                              py={1}
                              space={1}>
                              <Icon name={'clipboard-notes'} size={15} />
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
