import React, {useCallback, useState} from 'react';
import {TeacherService} from '../../../services/teacher.service';
import {useCoachContext} from '../../../providers/coach.provider';
import InfiniteScroll from '../../../components/InfiniteScroll';
import {Center, HStack, Text, useTheme} from 'native-base';
import {TeacherItemType} from '../../../types/teacher';
import EmptyStateComponent from '../EmptyState';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Icon from '../../../components/Icon';
import TeacherItem from '../TeacherItem';
import useDebounce from '../../../hooks/debounce';
import InputText from '../../../components/InputText';

const ITEMS_PER_PAGE = 20;

type Props = {
  showSearchFilter?: boolean;
  hideNewTeacherButton?: boolean;
  onSelectTeacher: (teacher: TeacherItemType) => void;
};

const TeachersList: React.FC<Props> = ({
  onSelectTeacher,
  showSearchFilter,
  hideNewTeacherButton,
}) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const {currentSchool} = useCoachContext();
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [teachersList, setTeachersList] = useState<TeacherItemType[]>([]);

  const navigate = useNavigate();

  const {t} = useTranslation();

  const loadFirstPageWithFilter = useCallback(
    (value: string) => {
      setTeachersList([]);
      setIsLoading(true);
      setIsTheEnd(false);
      TeacherService.findTeachersItemBySchoolId(
        value,
        currentSchool?.id || '',
        ITEMS_PER_PAGE,
        1,
      ).then(data => {
        if (data.length < ITEMS_PER_PAGE) {
          setIsTheEnd(true);
        }
        setTeachersList(data);
        setIsLoading(false);
      });
    },
    [currentSchool],
  );

  useDebounce(filter, 300, loadFirstPageWithFilter);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await TeacherService.findTeachersItemBySchoolId(
        filter,
        currentSchool?.id || '',
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }
      setTeachersList(prevData => [...prevData, ...data]);
    }
  };

  return (
    <>
      {showSearchFilter && (
        <InputText
          mb={2}
          value={filter}
          onChangeText={setFilter}
          placeholder={t('common.search')}
        />
      )}

      <InfiniteScroll
        isEnd={isTheEnd}
        data={teachersList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyComponent={
          <Center mt={'80px'}>
            <EmptyStateComponent
              handleCreate={() =>
                navigate(PathRoutes.teacher.form.replace(':id', 'new'))
              }
            />
          </Center>
        }
        renderItem={({item}) => (
          <TeacherItem teacher={item} onPress={() => onSelectTeacher(item)} />
        )}
      />

      {!hideNewTeacherButton && teachersList.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigate(PathRoutes.teacher.form.replace(':id', 'new'))
          }>
          <HStack alignSelf={'center'} space={3} alignItems={'center'}>
            <Icon name={'plus'} color={theme.colors.primary[200]} />
            <Text color={'primary.200'}>{t('home.teachers.addNew')}</Text>
          </HStack>
        </TouchableOpacity>
      )}
    </>
  );
};

export default TeachersList;
