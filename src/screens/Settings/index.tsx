import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {isTablet as Tablet} from 'react-native-device-info';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';
import i18n, {resources} from '../../i18n';
import Routes from '../../routes/paths';
import Navigation from '../../services/navigation';
var pkg = require('../../../package.json');

const SettingsScreen: React.FC = () => {
  const {t} = useTranslation(); // T must be in context to refresh currentLanguage.
  const currentLanguage = i18n.languages[0];
  const isTablet = Tablet();

  const options = [
    {
      icon: 'globe',
      label: 'Language',
      description: 'English (US)',
      onPress: () => Navigation.navigate(Routes.settings.changeLanguage),
    },
  ];

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '64px' : 4}
      pb={isTablet ? '64px' : 4}
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
                  Language
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

      <VStack w={'100%'}>
        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'wifi'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            Last sync: Apr 21, 2023
          </Text>
        </HStack>

        <HStack alignItems={'center'} py={'16px'} space={2}>
          <Icon name={'mobile-android'} />
          <Text fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
            App version v{pkg.version}
          </Text>
        </HStack>
      </VStack>
    </VStack>
  );
};

export default SettingsScreen;
