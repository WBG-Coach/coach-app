import React, {useCallback, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import InputText from '../../components/InputText';
import useDebounce from '../../hooks/debounce';
import {useTranslation} from 'react-i18next';
import Page from '../../components/Page';
import CoachItem from './CoachItem';
import {Center, FlatList, HStack, Spinner, Text} from 'native-base';
import {Coach} from '../../types/coach';
import {CoachService} from '../../services/coach.service';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import theme from '../../theme';
import {useNavigate} from 'react-router-native';
import PathRoutes from '../../routers/paths';

const CoachSelectScreen: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [coachList, setCoachList] = useState<Coach[]>([]);

  const navigate = useNavigate();

  const {t} = useTranslation();
  const {selectCoach, currentCoach, currentSchool} = useCoachContext();

  const loadAccounts = useCallback(
    async (value: string) => {
      setIsLoading(true);
      if (currentSchool) {
        setCoachList(await CoachService.findCoachItems(currentSchool, value));
      }
      setIsLoading(false);
    },
    [currentSchool],
  );

  useDebounce(filter, 300, loadAccounts);

  const goBack = async () => {
    if (currentCoach) {
      navigate(-1);
    } else {
      navigate(PathRoutes.selectSchool, {replace: true});
    }
  };

  const onSelect = (coach: Coach) => {
    selectCoach(coach);
    navigate(PathRoutes.home.main, {replace: true});
  };

  return (
    <Page setting logo back onBack={goBack}>
      <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
        {t('coachSelect.title')}
      </Text>

      <InputText
        mb={2}
        value={filter}
        placeholder={t('common.search')}
        onChangeText={setFilter}
      />

      {isLoading ? (
        <Center mx="20px" flex={1}>
          <Spinner />
        </Center>
      ) : (
        <FlatList
          data={coachList}
          ListEmptyComponent={
            <Center mx="20px">
              <Text fontWeight={600} color={'gray.700'}>
                {t('coachSelect.item-description-empty')}
              </Text>
            </Center>
          }
          renderItem={({item, index}) => (
            <CoachItem
              index={index}
              coach={item}
              onPress={() => onSelect(item)}
            />
          )}
        />
      )}

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
