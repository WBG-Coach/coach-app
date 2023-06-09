/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import Teacher from '../../../database/models/Teacher';
import TeacherService from '../../../services/teacher';
import {UserContext} from '../../../providers/contexts/UserContext';
import InfiniteScroll from '../../../components/InfiniteScroll';
import {useTranslation} from 'react-i18next';
import TeacherItem from '../TeacherItem';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {Center, HStack, Text, useTheme} from 'native-base';
import EmptyStateComponent from '../EmptyState';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../components/base/Icon';

const ITEMS_PER_PAGE = 20;

const TeachersList: React.FC = () => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teachersList, setTeachersList] = useState<Teacher[]>([]);
  const {user, setTeacher} = useContext(UserContext);

  const {t} = useTranslation();

  useEffect(() => {
    setTeachersList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    TeacherService.findTeachersWithSessionBySchoolId(
      user?.school?.id || '',
      ITEMS_PER_PAGE,
      1,
    ).then(data => {
      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setTeachersList(data);
      setIsLoading(false);
    });
  }, []);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await TeacherService.findTeachersWithSessionBySchoolId(
        user?.school?.id || '',
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setTeachersList(prevData => [...prevData, ...data]);
    }
  };

  const selectTeacher = (teacher: Teacher) => {
    setTeacher(teacher);
    Navigation.navigate(Routes.teacher.teacher);
  };

  return (
    <>
      <InfiniteScroll
        data={teachersList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyComponent={
          <Center flex={1} mt={'80px'}>
            <EmptyStateComponent
              handleCreate={() => Navigation.navigate(Routes.teacher.create)}
            />
          </Center>
        }
        renderItem={({item}) => (
          <TeacherItem teacher={item} onPress={() => selectTeacher(item)} />
        )}
      />

      <TouchableOpacity
        onPress={() => Navigation.navigate(Routes.teacher.create)}>
        <HStack alignSelf={'center'} space={3} alignItems={'center'}>
          <Icon name={'plus'} color={theme.colors.primary[200]} />
          <Text color={'primary.200'}>{t('home.teachers.addNew')}</Text>
        </HStack>
      </TouchableOpacity>
    </>
  );
};

export default TeachersList;
