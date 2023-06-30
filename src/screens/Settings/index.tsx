import React, {useCallback, useEffect, useState} from 'react';
import {useCoachContext} from '../../providers/coach.provider';
import {StorageService} from '../../services/storage.service';
import {HStack, Spinner, Text, VStack} from 'native-base';
import SyncService from '../../services/sync.service';
import {useNavigate} from 'react-router-native';
import {TouchableOpacity} from 'react-native';
import PathRoutes from '../../routers/paths';
import {useTranslation} from 'react-i18next';
import i18n, {resources} from '../../i18n';
import Icon from '../../components/Icon';
import Page from '../../components/Page';

var pkg = require('../../../package.json');

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const currentLanguage = i18n.languages[0];
  const {logout, currentCoach} = useCoachContext();
  const [pendingCount, setPendingCount] = useState({
    pendingTeachers: 0,
    pendingFeedbacks: 0,
    pendingSessions: 0,
  });
  const [lastSync, setLastSync] = useState('');
  const [loading, setLoading] = useState(true);

  const getSyncData = useCallback(async () => {
    setLoading(true);
    setLastSync(await StorageService.getLastSync());
    setPendingCount(await SyncService.getUnsyncedItemsCount());
    setLoading(false);
  }, []);

  useEffect(() => {
    getSyncData();
  }, [getSyncData]);

  const options = [
    {
      hide: false,
      icon: 'globe',
      label: 'settings.language',
      description: resources[currentLanguage].label,
      onPress: () => navigate(PathRoutes.settings.changeLanguage),
    },
    {
      hide: !currentCoach,
      icon: 'signout',
      label: 'settings.logout',
      description: 'settings.logout-description',
      onPress: async () => {
        await logout();
        navigate(-999);
      },
    },
  ];

  const renderSyncTag = (label: string, count: number) => {
    return (
      <HStack
        bg="#F2F4F7"
        borderRadius="8px"
        p="8px"
        flex={1}
        justifyContent="center">
        <Text fontSize={'14px'} color={'gray.600'}>
          {label}
        </Text>
        <Text
          fontSize={'14px'}
          ml="4px"
          fontFamily="Inter"
          fontWeight={700}
          color={'gray.600'}>
          {count}
        </Text>
      </HStack>
    );
  };

  return (
    <Page back title={t('settings.title')}>
      <VStack flex={1}>
        {options.map(
          (option, index) =>
            !option.hide && (
              <TouchableOpacity key={index} onPress={option.onPress}>
                <HStack
                  mb="12px"
                  space={2}
                  alignItems={'center'}
                  borderBottomColor={'gray.200'}
                  borderBottomWidth={'1px'}
                  pb={3}>
                  <Icon name={option.icon} />
                  <VStack flex={1} justifyContent="center">
                    <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                      {t(option.label)}
                    </Text>
                    <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
                      {t(option.description)}
                    </Text>
                  </VStack>
                  <Icon name={'angle-right'} />
                </HStack>
              </TouchableOpacity>
            ),
        )}
      </VStack>
      {loading ? (
        <Spinner />
      ) : (
        <VStack mb="24px">
          <Text
            color={'#111417'}
            fontFamily="Inter"
            fontWeight="700"
            fontSize="16px">
            {t('settings.unsynced-items')}
          </Text>
          <HStack space={1} justifyContent="space-around" my="12px">
            {renderSyncTag(
              t('settings.unsynced-teacher'),
              pendingCount.pendingTeachers,
            )}
            {renderSyncTag(
              t('settings.unsynced-session'),
              pendingCount.pendingSessions,
            )}
            {renderSyncTag(
              t('settings.unsynced-feedback'),
              pendingCount.pendingFeedbacks,
            )}
          </HStack>
        </VStack>
      )}
      <VStack w={'100%'}>
        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'wifi'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('settings.lastSync', {value: lastSync})}
          </Text>
        </HStack>

        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'mobile-android'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            {t('settings.appVersion') || 'App version'} v{pkg.version}
          </Text>
        </HStack>
      </VStack>
    </Page>
  );
};

export default SettingsScreen;
