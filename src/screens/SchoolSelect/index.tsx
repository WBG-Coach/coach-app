import React, {useCallback, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import InfiniteScroll from '../../components/InfiniteScroll';
import {SchoolService} from '../../services/school.service';
import InputText from '../../components/InputText';
import useDebounce from '../../hooks/debounce';
import {useTranslation} from 'react-i18next';
import {School} from '../../types/school';
import Page from '../../components/Page';
import SchoolItem from './SchoolItem';
import {Text} from 'native-base';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';

const ITEMS_PER_PAGE = 20;

const SchoolSelectScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schoolList, setSchoolList] = useState<School[]>([]);

  const {t} = useTranslation();
  const navigate = useNavigate();
  const {logout, selectSchool} = useCoachContext();

  const loadFirstPageWithFilter = useCallback((value: string) => {
    setSchoolList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    SchoolService.findSchoolItems(value, ITEMS_PER_PAGE, 1).then(data => {
      if (data && data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }
      setSchoolList(data);
      setIsLoading(false);
    });
  }, []);

  useDebounce(filter, 300, loadFirstPageWithFilter);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);
      const data = await SchoolService.findSchoolItems(
        filter,
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }

      setSchoolList(prevData => [...prevData, ...data]);
      setIsLoading(false);
    }
  };

  const onSelectSchool = (school: School) => {
    selectSchool(school);
    navigate(PathRoutes.main, {replace: true});
  };

  return (
    <Page setting logo back>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
        {t('schoolSelect.title')}
      </Text>

      <InputText
        mb={2}
        value={filter}
        placeholder={t('common.search')}
        onChangeText={setFilter}
      />

      <InfiniteScroll
        data={schoolList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        emptyMessage={t('schoolSelect.item-description-empty')}
        renderItem={({item, index}) => (
          <SchoolItem
            index={index}
            school={item}
            onPress={() => onSelectSchool(item)}
          />
        )}
      />
    </Page>
  );
};

export default SchoolSelectScreen;
