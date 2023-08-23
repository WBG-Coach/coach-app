import React, {useCallback, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import InfiniteScroll from '../../components/InfiniteScroll';
import InputText from '../../components/InputText';
import useDebounce from '../../hooks/debounce';
import {useTranslation} from 'react-i18next';
import Page from '../../components/Page';
import CoachItem from './CoachItem';
import {HStack, Text} from 'native-base';
import {Coach} from '../../types/coach';
import {CoachService} from '../../services/coach.service';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import theme from '../../theme';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';

const ITEMS_PER_PAGE = 20;

const CoachSelectScreen: React.FC = () => {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [isTheEnd, setIsTheEnd] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [coachList, setCoachList] = useState<Coach[]>([]);

  const navigate = useNavigate();

  const {t} = useTranslation();
  const {logout, login} = useCoachContext();

  const loadFirstPageWithFilter = useCallback((value: string) => {
    setCoachList([]);
    setIsLoading(true);
    setIsTheEnd(false);
    CoachService.findCoachItems(value, ITEMS_PER_PAGE, 1).then(data => {
      if (data && data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }
      setCoachList(data);
      setIsLoading(false);
    });
  }, []);

  useDebounce(filter, 300, loadFirstPageWithFilter);

  const loadNextPage = async () => {
    if (!isLoading && !isTheEnd) {
      setPage(page + 1);
      setIsLoading(true);

      const data = await CoachService.findCoachItems(
        filter,
        ITEMS_PER_PAGE,
        page + 1,
      );

      if (data.length < ITEMS_PER_PAGE) {
        setIsTheEnd(true);
      }

      setCoachList(prevData => [...prevData, ...data]);
      setIsLoading(false);
    }
  };

  return (
    <Page setting logo onLogout={logout}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
        {t('coachSelect.title')}
      </Text>

      <InputText
        mb={2}
        value={filter}
        placeholder={t('common.search')}
        onChangeText={setFilter}
      />

      <InfiniteScroll
        data={coachList}
        isLoading={isLoading}
        loadNextPage={loadNextPage}
        isEnd={isTheEnd}
        emptyMessage={t('coachSelect.item-description-empty')}
        renderItem={({item, index}) => (
          <CoachItem index={index} coach={item} onPress={() => login(item)} />
        )}
      />
      <Button
        variant="outlined"
        onPress={() => navigate(PathRoutes.createAccount)}>
        <HStack alignItems="center">
          <Icon name="plus" size={24} color={theme.colors.primary[200]} />
          <Text ml="8px" color="primary.200" fontSize={16} fontWeight={500}>
            {t('coachSelect.new-profile')}
          </Text>
        </HStack>
      </Button>
    </Page>
  );
};

export default CoachSelectScreen;
