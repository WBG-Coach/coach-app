import React, {useCallback, useState} from 'react';
import {TeacherService} from '../../../services/teacher.service';
import {useCoachContext} from '../../../providers/coach.provider';
import InfiniteScroll from '../../../components/InfiniteScroll';
import {Center, HStack, Text, VStack} from 'native-base';
import {TeacherItemType} from '../../../types/teacher';
import EmptyStateComponent from '../EmptyState';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../../routers/paths';
import {useTranslation} from 'react-i18next';
import TeacherItem from '../TeacherItem';
import useDebounce from '../../../hooks/debounce';
import InputText from '../../../components/InputText';
import Button from '../../../components/Button';

const ITEMS_PER_PAGE = 20;

type Props = {
  showSearchFilter?: boolean;
  customProps?: {
    service: (...params: any) => Promise<any>;
    TeacherItem: React.FC<React.ComponentProps<typeof TeacherItem>>;
  };
  hideNewTeacherButton?: boolean;
  onSelectTeacher: (teacher: TeacherItemType) => void;
};

const TeachersList: React.FC<Props> = ({
  customProps,
  onSelectTeacher,
  showSearchFilter,
  hideNewTeacherButton,
}) => {
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
      (customProps?.service || TeacherService.findTeachersItemBySchoolId)(
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
      const data = await (
        customProps?.service || TeacherService.findTeachersItemBySchoolId
      )(filter, currentSchool?.id || '', ITEMS_PER_PAGE, page + 1);

      if (data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }
      setTeachersList(prevData => [...prevData, ...data]);
    }
  };

  const ItemComponent = customProps?.TeacherItem || TeacherItem;

  return (
    <>
      <HStack alignItems={'center'}>
        <VStack flex={1}>
          <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
            {t('home.teachers.title')}
          </Text>

          {!hideNewTeacherButton && teachersList.length > 0 && (
            <HStack space={1}>
              <Text fontSize={'TSM'} fontWeight={400} color={'gray.800'}>
                {t('home.teachers.teachers_count')}
              </Text>
              <Text fontSize={'TSM'} fontWeight={600} color={'gray.800'}>
                {teachersList.length}
              </Text>
            </HStack>
          )}
        </VStack>

        {!hideNewTeacherButton && teachersList.length > 0 && (
          <Button
            variant={'outlined'}
            onPress={() =>
              navigate(PathRoutes.teacher.form.replace(':id', 'new'))
            }>
            {t('home.teachers.addNew')}
          </Button>
        )}
      </HStack>

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
          <Center flex={1}>
            <EmptyStateComponent
              handleCreate={() =>
                navigate(PathRoutes.teacher.form.replace(':id', 'new'))
              }
            />
          </Center>
        }
        renderItem={({item}) => (
          <ItemComponent teacher={item} onPress={() => onSelectTeacher(item)} />
        )}
      />
    </>
  );
};

export default TeachersList;
