import {Box, HStack, Spinner, Text, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {isTablet as Tablet} from 'react-native-device-info';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';
import i18n, {resources} from '../../i18n';
import Routes from '../../routes/paths';
import {getWatermelon, syncWatermelon} from '../../database';
import Navigation from '../../services/navigation';
import TeacherService from '../../services/teacher';
import SessionService from '../../services/session';
var pkg = require('../../../package.json');

const SettingsScreen: React.FC = () => {
  const {t} = useTranslation();
  const currentLanguage = i18n.languages[0];
  const [pendingCount, setPendingCount] = useState({
    pendingTeachers: 0,
    pendingFeedbacks: 0,
    pendingSessions: 0,
  });
  const [lastSync, setLastSync] = useState('');
  const [loading, setLoading] = useState(true);
  const isTablet = Tablet();

  const updateLastSync = useCallback(async () => {
    setLoading(true);
    const db = await getWatermelon();
    const date: any = await db.localStorage.get('__watermelon_last_pulled_at');
    setLastSync(new Date(date).toUTCString().replace(' GMT', ''));
    const pendingTeachers = await TeacherService.countPendingTeacherToSync();
    const pendingFeedbacks = await SessionService.countPendingFeedbacksToSync();
    const pendingSessions = await SessionService.countPendingSessionsToSync();

    setPendingCount({pendingTeachers, pendingFeedbacks, pendingSessions});
    setLoading(false);
  }, []);

  useEffect(() => {
    updateLastSync();
  }, [updateLastSync]);

  const options = [
    {
      icon: 'globe',
      label: 'Language',
      description: 'English (US)',
      onPress: () => Navigation.navigate(Routes.settings.changeLanguage),
    },
  ];

  const syncNow = async () => {
    setLoading(true);
    await syncWatermelon();
    await updateLastSync();
    setLoading(false);
  };

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '32px' : 4}
      pb={isTablet ? '32px' : 4}
      flex={1}>
      <VStack flex={1}>
        {options.map((option, index) => (
          <TouchableOpacity key={index} onPress={option.onPress}>
            <HStack
              alignItems={'center'}
              space={2}
              borderBottomColor={'gray.200'}
              borderBottomWidth={'1px'}
              pb={3}>
              <Icon name={option.icon} />
              <VStack flex={1} space={2}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  {t('settings.settings.title') || 'Language'}
                </Text>
                <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                  {resources[currentLanguage].label}
                </Text>
              </VStack>
              <Icon name={'angle-right'} />
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>
      {loading ? (
        <Spinner />
      ) : (
        <VStack mb="24px">
          <Text color={'#111417'} fontWeight="bold" fontSize="16px">
            {t('settings.settings.unsynced-items')}
          </Text>
          <HStack justifyContent="space-around" my="12px">
            <Text color={'gray.600'} p="12px">
              {t('settings.settings.unsynced-teacher', {
                count: pendingCount.pendingTeachers,
              })}
            </Text>
            <Box h="full" bg="#111417" w="1px"></Box>
            <Text color={'gray.600'} p="12px">
              {t('settings.settings.unsynced-session', {
                count: pendingCount.pendingSessions,
              })}
            </Text>
            <Box h="full" bg="#111417" w="1px"></Box>
            <Text color={'gray.600'} p="12px">
              {t('settings.settings.unsynced-feedback', {
                count: pendingCount.pendingFeedbacks,
              })}
            </Text>
          </HStack>

          {pendingCount.pendingFeedbacks ||
          pendingCount.pendingSessions ||
          pendingCount.pendingTeachers ? (
            <TouchableOpacity onPress={syncNow}>
              <Box
                px={2}
                py={1}
                borderWidth="1px"
                borderColor={'gray.600'}
                borderRadius={'4px'}>
                <Text color={'gray.600'} textAlign="center">
                  {t('settings.settings.sync_now')}
                </Text>
              </Box>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </VStack>
      )}
      <VStack w={'100%'}>
        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'wifi'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('settings.settings.lastSync', {value: lastSync})}
          </Text>
        </HStack>

        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'mobile-android'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('settings.settings.appVersion') || 'App version'} v{pkg.version}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SettingsScreen;
