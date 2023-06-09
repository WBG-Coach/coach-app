import {Text, VStack} from 'native-base';
import React, {useCallback, useContext, useState} from 'react';
import Input from '../../components/base/Input';
import {UserContext} from '../../providers/contexts/UserContext';
import User from '../../database/models/User';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';
import UserItem from './UserItem';
import UserService from '../../services/user';
import InfiniteScroll from '../../components/InfiniteScroll';
import useDebounce from '../../hooks/debounce';

const ITEMS_PER_PAGE = 20;

const ProfileSelectScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userList, setUserList] = useState<User[]>([]);

  const isTablet = Tablet();
  const {t} = useTranslation();
  const {handleSelectProfile, user} = useContext(UserContext);

  const loadFirstPageWithFilter = useCallback((value: string) => {
    setUserList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    UserService.findUsersWithTeacherCoachingCount(
      user?.school?.id || '',
      value,
      ITEMS_PER_PAGE,
      1,
    ).then(data => {
      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setUserList(data);
      setIsLoading(false);
    });
  }, []);

  useDebounce(filter, 300, loadFirstPageWithFilter);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await UserService.findUsers(
        filter,
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setUserList(prevData => [...prevData, ...data]);
    }
  };

  return (
    <VStack
      flex={1}
      w={'100%'}
      alignItems={'flex-start'}
      px={isTablet ? '64px' : '16px'}
      mt={isTablet ? '64px' : '24px'}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
        {t('setupUserData.profileSelect.title')}
      </Text>

      <Input
        mb={2}
        value={filter}
        icon="search"
        marginBottom={2}
        placeholder={'Search'}
        onChangeText={setFilter}
      />

      <InfiniteScroll
        data={userList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyMessage={t('setupUserData.profileSelect.emptyList')}
        renderItem={({item, index}) => (
          <UserItem
            index={index}
            user={item}
            isFirst={index === 0}
            onPress={() => handleSelectProfile(item as any)}
          />
        )}
      />
    </VStack>
  );
};

export default ProfileSelectScreen;
