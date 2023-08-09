import React, {useCallback, useEffect, useState} from 'react';
import {TeacherService} from '../../../../../services/teacher.service';
import {useCoachContext} from '../../../../../providers/coach.provider';
import {
  Center,
  FlatList,
  HStack,
  Image,
  Spinner,
  Text,
  VStack,
  useTheme,
} from 'native-base';
import {TeacherItemType} from '../../../../../types/teacher';
import {useTranslation} from 'react-i18next';
import TeacherItem from '../../../TeacherItem';
import {
  EmptyIcon,
  EmptyIconAvailable,
  EmptyIconUnavailable,
} from '../../../../../assets/images/stats';
import Button from '../../../../../components/Button';
import Icon from '../../../../../components/Icon';
import PathRoutes from '../../../../../routers/paths';
import {useNavigate} from 'react-router-native';

const ITEMS_PER_PAGE = 100;

type Props = {
  onSelectTeacher: (teacher: TeacherItemType) => void;
};

const TeachersListWithSessions: React.FC<Props> = ({onSelectTeacher}) => {
  const [isLoading, setIsLoading] = useState(true);
  const {currentSchool} = useCoachContext();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const theme = useTheme();

  const defaultList = {
    available: [] as TeacherItemType[],
    unavailable: [] as TeacherItemType[],
  };

  const [teachersList, setTeachersList] = useState<{
    available: TeacherItemType[];
    unavailable: TeacherItemType[];
  }>(defaultList);

  const loadFirstPage = useCallback(async () => {
    setTeachersList(defaultList);
    setIsLoading(true);

    TeacherService.findTeachersItemBySchoolId(
      '',
      currentSchool?.id || '',
      ITEMS_PER_PAGE,
      1,
    ).then(data => {
      const newList = data.reduce((acc, teacher) => {
        if (teacher.sessionsCount >= 3) {
          acc.available.push(teacher);
        } else {
          acc.unavailable.push(teacher);
        }

        return acc;
      }, defaultList);

      setTeachersList(newList);
      setIsLoading(false);
    });
  }, [currentSchool]);

  useEffect(() => {
    loadFirstPage();
  }, [loadFirstPage]);

  return isLoading ? (
    <Center w={'full'} h={'60px'}>
      <Spinner color="blue" size="lg" />
    </Center>
  ) : (
    <>
      {teachersList.available.length < 1 &&
      teachersList.unavailable.length < 1 ? (
        <Center flex={1}>
          <VStack alignItems={'center'}>
            <Image source={EmptyIcon} alt="icon representing a empty state" />

            <Text
              fontSize={'HXS'}
              textAlign={'center'}
              fontWeight={600}
              color={'gray.800'}
              mt={2}>
              {t('home.stats.empty.title')}
            </Text>

            <Text
              fontSize={'TSM'}
              textAlign={'center'}
              fontWeight={400}
              color={'gray.700'}>
              {t('home.stats.empty.subtitle')}
            </Text>

            <Button
              onPress={() =>
                navigate(PathRoutes.teacher.form.replace(':id', 'new'))
              }
              mt={8}>
              <HStack alignItems={'center'} space={2}>
                <Icon name={'plus'} color={theme.colors.white} />
                <Text>Add new teacher</Text>
              </HStack>
            </Button>
          </VStack>
        </Center>
      ) : (
        <>
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'} mt={2}>
            {t('home.stats.available.title')}
          </Text>
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.700'} mb={4}>
            {t('home.stats.available.subtitle')}
          </Text>
          {teachersList.available.length >= 1 ? (
            <FlatList
              style={{flexGrow: 0}}
              data={teachersList.available}
              renderItem={({item}) => (
                <TeacherItem
                  teacher={item}
                  onPress={() => onSelectTeacher(item)}
                  customSubLabel=""
                />
              )}
            />
          ) : (
            <Center>
              <VStack alignItems={'center'}>
                <Image
                  source={EmptyIconAvailable}
                  alt="icon representing a empty state"
                />

                <Text
                  fontSize={'TSM'}
                  textAlign={'center'}
                  fontWeight={700}
                  color={'gray.800'}
                  mt={2}>
                  {t('home.stats.available.empty.title')}
                </Text>

                <Text
                  fontSize={'TSM'}
                  textAlign={'center'}
                  fontWeight={400}
                  color={'gray.700'}>
                  {t('home.stats.available.empty.subtitle')}
                </Text>
              </VStack>
            </Center>
          )}
          <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'} mt={6}>
            {t('home.stats.unavailable.title')}
          </Text>
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.700'}>
            {t('home.stats.unavailable.subtitle')}
          </Text>
          {teachersList.unavailable.length >= 1 ? (
            <FlatList
              data={teachersList.unavailable}
              renderItem={({item}) => (
                <TeacherItem
                  customSubLabel={t('home.stats.unavailable.label', {
                    value: 3 - item.sessionsCount,
                  })}
                  teacher={item}
                  onPress={() => onSelectTeacher(item)}
                />
              )}
            />
          ) : (
            <Center>
              <VStack alignItems={'center'}>
                <Image
                  source={EmptyIconUnavailable}
                  alt="icon representing a empty state"
                />

                <Text
                  fontSize={'TSM'}
                  textAlign={'center'}
                  fontWeight={700}
                  color={'gray.800'}
                  mt={2}>
                  {t('home.stats.unavailable.empty.title')}
                </Text>

                <Text
                  fontSize={'TSM'}
                  textAlign={'center'}
                  fontWeight={400}
                  color={'gray.700'}>
                  {t('home.stats.unavailable.empty.subtitle')}
                </Text>
              </VStack>
            </Center>
          )}
        </>
      )}
    </>
  );
};

export default TeachersListWithSessions;
