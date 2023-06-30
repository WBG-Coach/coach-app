import React, {useCallback, useEffect, useState} from 'react';
import {Center, HStack, Text, useTheme} from 'native-base';
import PathRoutes from '../../../../../routers/paths';
import Icon from '../../../../../components/Icon';
import {useNavigate} from 'react-router-native';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import InfiniteScroll from '../../../../../components/InfiniteScroll';
import SessionListEmpty from './SessionListEmpty';
import {SessionService} from '../../../../../services/session.service';
import {SessionItemType} from '../../../../../types/session';

const ITEMS_PER_PAGE = 20;

type Props = {
  teacherId: string;
};

const SessionList: React.FC<Props> = ({teacherId}) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionList, setSessionList] = useState<SessionItemType[]>([]);

  const navigate = useNavigate();

  const {t} = useTranslation();

  const loadFirstPageWithFilter = useCallback(async () => {
    setSessionList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    const data = await SessionService.findSessionFromTeacher(
      teacherId,
      ITEMS_PER_PAGE,
      1,
    );
    if (data.length < ITEMS_PER_PAGE) {
      setIsTheEnd(true);
    }
    setSessionList(data);
    setIsLoading(false);
  }, [teacherId]);

  useEffect(() => {
    loadFirstPageWithFilter();
  }, [loadFirstPageWithFilter]);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await SessionService.findSessionFromTeacher(
        teacherId,
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }
      setSessionList(prevData => [...prevData, ...data]);
    }
  };

  return (
    <>
      <InfiniteScroll
        isEnd={isTheEnd}
        data={sessionList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyComponent={
          <Center mt={'80px'}>
            <SessionListEmpty
              handleCreate={() =>
                navigate(
                  PathRoutes.classObservation.about.replace(
                    ':teacherId',
                    teacherId,
                  ),
                )
              }
            />
          </Center>
        }
        renderItem={({index}) => (
          <Text>{index}</Text>
          // <TeacherItem teacher={item} onPress={() => onSelectTeacher(item)} />
        )}
      />

      {sessionList.length > 0 && (
        <TouchableOpacity
          onPress={() =>
            navigate(PathRoutes.teacher.form.replace(':id', 'new'))
          }>
          <HStack alignSelf={'center'} space={3} alignItems={'center'}>
            <Icon name={'plus'} color={theme.colors.primary[200]} />
            <Text color={'white'}>{t('home.teachers.addNew')}</Text>
          </HStack>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SessionList;
