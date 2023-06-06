import {UserContext} from '../../providers/contexts/UserContext';
import InfiniteScrollList from '../../components/InfiniteScroll';
import React, {useCallback, useContext, useState} from 'react';
import {isTablet as Tablet} from 'react-native-device-info';
import SchoolService from '../../services/school';
import School from '../../database/models/School';
import Input from '../../components/base/Input';
import useDebounce from '../../hooks/debounce';
import {useTranslation} from 'react-i18next';
import {Text, VStack} from 'native-base';
import SchoolItem from './SchoolItem';

const ITEMS_PER_PAGE = 20;

const SchoolSelectScreen = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schoolList, setSchoolList] = useState<School[]>([]);

  const isTablet = Tablet();
  const {t} = useTranslation();
  const {handleSelectSchool} = useContext(UserContext);

  const loadFirstPageWithFilter = useCallback((value: string) => {
    setSchoolList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    SchoolService.findSchools(value, ITEMS_PER_PAGE, 1).then(data => {
      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setSchoolList(data);
      setIsLoading(false);
    });
  }, []);

  useDebounce(filter, 300, loadFirstPageWithFilter);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await SchoolService.findSchools(
        filter,
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) setIsTheEnd(true);
      setSchoolList(prevData => [...prevData, ...data]);
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
        {t('setupUserData.schoolSelect.title')}
      </Text>

      <Input
        mb={2}
        value={filter}
        icon="search"
        marginBottom={2}
        placeholder={'Search'}
        onChangeText={setFilter}
      />

      <InfiniteScrollList
        data={schoolList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyMessage={t('setupUserData.schoolSelect.emptyList')}
        renderItem={({item, index}) => (
          <SchoolItem
            school={item}
            isFirst={index === 0}
            index={index}
            onPress={() => handleSelectSchool(item)}
          />
        )}
      />
    </VStack>
  );
};

export default SchoolSelectScreen;
