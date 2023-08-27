import React, {useCallback, useEffect, useState} from 'react';
import {HStack, Spinner, Text, VStack, useToast} from 'native-base';
import {useCoachContext} from '../../providers/coach.provider';
import {StorageService} from '../../services/storage.service';
import {useNetInfo} from '@react-native-community/netinfo';
import SyncService from '../../services/sync.service';
import {useNavigate} from 'react-router-native';
import {TouchableOpacity} from 'react-native';
import PathRoutes from '../../routers/paths';
import {useTranslation} from 'react-i18next';
import i18n, {resources} from '../../i18n';
import Toast from '../../components/Toast';
import Icon from '../../components/Icon';
import Page from '../../components/Page';

var pkg = require('../../../package.json');

const pendingCountInit = {
  pendingTeachers: 0,
  pendingFeedbacks: 0,
  pendingSessions: 0,
};

const SettingsScreen: React.FC = () => {
  const [pendingCount, setPendingCount] = useState(pendingCountInit);
  const {logout, currentCoach} = useCoachContext();
  const [lastSync, setLastSync] = useState('');
  const [loading, setLoading] = useState(true);
  const currentLanguage = i18n.languages[0];
  const {isConnected} = useNetInfo();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const toast = useToast();

  const getSyncData = useCallback(async () => {
    setLoading(true);
    setLastSync(await StorageService.getLastSyncFormated());
    setPendingCount(await SyncService.getUnsyncedItemsCount());
    setLoading(false);
  }, []);

  useEffect(() => {
    getSyncData();
  }, [getSyncData]);

  const trySync = async () => {
    setLoading(true);
    try {
      if (!isConnected) {
        throw new Error();
      }

      await SyncService.trySyncData();
      await getSyncData();
    } catch (err) {
      toast.show({
        placement: 'top',
        render: () => (
          <Toast
            type="error"
            icon="wifi-slash"
            title={t('settings.sync-error-title')}
            description={t('settings.sync-error-description')}
          />
        ),
      });
    }
    setLoading(false);
  };

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
                  <Icon name={option.icon as any} />
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
          <HStack alignItems="center" justifyContent="space-between">
            <Text
              color={'#111417'}
              fontFamily="Inter"
              fontWeight="700"
              fontSize="16px">
              {t('settings.unsynced-items')}
            </Text>
            {(pendingCount.pendingTeachers > 0 ||
              pendingCount.pendingSessions > 0 ||
              pendingCount.pendingFeedbacks > 0) && (
              <TouchableOpacity onPress={trySync}>
                <HStack alignItems="center">
                  <Text
                    mr="4px"
                    color={'#3373CC'}
                    fontFamily="Inter"
                    fontSize="16px">
                    {'Try sync'}
                  </Text>
                  <Icon name="redo" color={'#3373CC'} size={24} />
                </HStack>
              </TouchableOpacity>
            )}
          </HStack>
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
