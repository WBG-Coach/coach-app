import {Q} from '@nozbe/watermelondb';
import {
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {getWatermelon} from '../../../../database';
import Teacher from '../../../../database/models/Teacher';
import {UserContext} from '../../../../providers/contexts/UserContext';
import {isTablet as Tablet} from 'react-native-device-info';
import Input from '../../../../components/base/Input';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Navigation from '../../../../services/navigation';
import Routes from '../../../../routes/paths';
import Icon from '../../../../components/base/Icon';
import {useTranslation} from 'react-i18next';

const QuickStatsScreen = () => {
  const {user, setTeacher} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = Tablet();
  const [teachers, setTeachers] = useState({
    isLoading: true,
    data: undefined as Teacher[] | undefined,
  });

  const [filteredTeachers, setFilteredTeachers] = useState<Teacher[]>();

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const allTeachers = await db.collections
        .get<Teacher>('teacher')
        .query(Q.where('school_id', Q.eq(user?.school?.id as string)))
        .fetch();

      const teachersUpdated: Teacher[] = await Promise.all(
        allTeachers.map(async teacher => {
          return {
            ...teacher._raw,
            image: (await teacher.image.fetch())?._raw,
          } as any;
        }),
      );

      setTeachers({isLoading: false, data: teachersUpdated});
      setFilteredTeachers(teachersUpdated);
    })();
  }, []);

  const handleFilterProfile = (text: string) => {
    if (teachers.data) {
      const newTeachers = teachers.data.filter(
        el => el.name.indexOf(text) > -1,
      );
      setFilteredTeachers(newTeachers);
    }
  };

  return teachers.isLoading ? (
    <Center flex={1}>
      <Spinner />
    </Center>
  ) : (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '32px' : 4}
      flex={1}>
      <VStack flex={1}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          {t('quickAccess.stats.title') || 'Check teacher stats'}
        </Text>
        <Text
          fontSize={'TMD'}
          fontWeight={400}
          color={'gray.800'}
          mt={2}
          mb={4}>
          {t('quickAccess.stats.subtitle') ||
            'Select a teacher to see their progress'}
        </Text>

        <Input
          icon="search"
          marginBottom={2}
          placeholder={'Search'}
          onChangeText={handleFilterProfile}
        />

        <FlatList
          keyExtractor={({id}) => id}
          data={filteredTeachers}
          mb={5}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() => {
                setTeacher(item as any);
                Navigation.navigate(Routes.teacher.teacher, {
                  tabIn: 1,
                });
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
                      <Image
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
                    <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                      {item.name}
                    </Text>
                    <Text fontSize={'TSM'} fontWeight={500} color={'gray.600'}>
                      {item.subject}
                    </Text>
                  </VStack>
                </HStack>
                <Icon name={'angle-right'} />
              </HStack>
            </TouchableOpacity>
          )}
        />
      </VStack>
    </VStack>
  );
};

export default QuickStatsScreen;
