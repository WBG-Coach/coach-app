import React, {useCallback, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import {SchoolService} from '../../services/school.service';
import {CoachService} from '../../services/coach.service';
import {QrCodeImg} from '../../assets/images/scan';
import InputText from '../../components/InputText';
import {useNavigate} from 'react-router-native';
import useDebounce from '../../hooks/debounce';
import {useTranslation} from 'react-i18next';
import PathRoutes from '../../routers/paths';
import {School} from '../../types/school';
import Page from '../../components/Page';
import {
  Button,
  FlatList,
  Image,
  Modal,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import QrReader from '../../components/QrReader';
import SchoolItem from './SchoolItem';

const SchoolSelectScreen: React.FC = () => {
  const [filter, setFilter] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [schoolList, setSchoolList] = useState<School[]>([]);

  const {t} = useTranslation();
  const navigate = useNavigate();
  const {selectSchool, currentSchool, currentCoach} = useCoachContext();

  const loadSchools = useCallback(async (value: string) => {
    setIsLoading(true);
    setSchoolList(await SchoolService.findSchoolItems(value));
    setIsLoading(false);
  }, []);

  useDebounce(filter, 300, loadSchools);

  const onSelectSchool = async (school: School) => {
    await selectSchool(school);

    await createCoachSchool();
    navigate(PathRoutes.home.main, {replace: true});
  };

  const onRead = async (data: string) => {
    setIsOpen(false);

    const school: School = JSON.parse(data);

    await selectSchool(school);

    await createCoachSchool();

    navigate(PathRoutes.syncDetails, {replace: true});
  };

  const createCoachSchool = async () => {
    setIsLoading(true);

    if (currentCoach && currentSchool) {
      await CoachService.createCoachSchool(currentCoach, currentSchool);
    }
  };

  return (
    <Page setting logo back={!!currentSchool}>
      {isLoading ? (
        <Spinner />
      ) : schoolList.length > 0 ? (
        <>
          <Text
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.700'}
            mb={'16px'}>
            {t('schoolSelect.title')}
          </Text>

          <InputText
            mb={2}
            value={filter}
            placeholder={t('common.search')}
            onChangeText={setFilter}
          />

          <FlatList
            data={schoolList}
            keyExtractor={item => item.id || ''}
            renderItem={({item, index}) => (
              <SchoolItem
                index={index}
                school={item}
                onPress={() => onSelectSchool(item)}
              />
            )}
          />
        </>
      ) : (
        <VStack my="auto">
          <Image
            w="172px"
            h="172px"
            mt="45px"
            source={QrCodeImg}
            mx="auto"
            alt="scan image"
          />
          <Text
            mt="24px"
            textAlign="center"
            fontSize={20}
            color="#111417"
            fontWeight="600">
            {t('aboutScan.title')}
          </Text>
          <Text mt="4px" color="#576375" fontSize={16} textAlign="center">
            {t('aboutScan.description')}
          </Text>
        </VStack>
      )}

      <Button
        bg="#3373CC"
        mt="auto"
        _text={{fontWeight: 500, fontSize: 16}}
        onPress={() => setIsOpen(true)}>
        {t('aboutScan.scan')}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} flex={1}>
        <VStack flex={1} w="full">
          <QrReader
            onBack={() => navigate(-1)}
            onRead={onRead}
            onClickSetting={() => {}}
          />
        </VStack>
      </Modal>
    </Page>
  );
};

export default SchoolSelectScreen;
