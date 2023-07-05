import React, {useCallback, useEffect, useState} from 'react';
import {Center, HStack, Text, useTheme} from 'native-base';
import PathRoutes from '../../../../../routers/paths';
import Icon from '../../../../../components/Icon';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import InfiniteScroll from '../../../../../components/InfiniteScroll';
import SessionListEmpty from './SessionListEmpty';
import {SessionService} from '../../../../../services/session.service';
import SessionItem from './SessionItem';
import {Session} from '../../../../../types/session';
import Button from '../../../../../components/Button';

const ITEMS_PER_PAGE = 20;

type Props = {
  teacherId: string;
};

const SessionList: React.FC<Props> = ({teacherId}) => {
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionList, setSessionList] = useState<Session[]>([]);

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

  const startNewClassObservation = () => {
    navigate(
      PathRoutes.classObservation.about.replace(':teacherId', teacherId),
    );
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
            <SessionListEmpty handleCreate={startNewClassObservation} />
          </Center>
        }
        renderItem={({item, index}) => (
          <SessionItem
            key={index}
            index={index}
            session={item}
            onPress={() => navigate(PathRoutes.session.details, {state: item})}
          />
        )}
      />

      {sessionList.length > 0 && (
        <Button variant="outlined" onPress={startNewClassObservation}>
          <HStack alignSelf={'center'} space={3} alignItems={'center'}>
            <Icon name={'plus'} color={theme.colors.primary[200]} />
            <Text color={'primary.200'}>
              {t('teacher.tabs.session.newClassObservation')}
            </Text>
          </HStack>
        </Button>
      )}
    </>
  );
};

export default SessionList;
