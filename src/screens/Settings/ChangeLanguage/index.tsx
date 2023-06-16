import {Button, HStack, Radio, Text, VStack} from 'native-base';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {isTablet as Tablet} from 'react-native-device-info';
import {TouchableOpacity} from 'react-native-gesture-handler';
import i18n, {resources} from '../../../i18n';
import Navigation from '../../../services/navigation';

const ChangeLanguageScreen: React.FC = () => {
  const currentLanguage = i18n.languages[0];
  const [language, setLanguage] = useState(currentLanguage);
  const {t} = useTranslation();
  const isTablet = Tablet();

  return (
    <VStack
      safeAreaBottom
      mt={isTablet ? '64px' : 6}
      px={isTablet ? '32px' : 4}
      pb={isTablet ? '32px' : 4}
      flex={1}>
      <VStack flex={1} space={4}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('settings.changeLanguage.title') || 'Select language'}
        </Text>

        {Object.keys(resources).map(option => (
          <TouchableOpacity key={option} onPress={() => setLanguage(option)}>
            <HStack
              alignItems={'center'}
              borderBottomColor={'gray.200'}
              borderBottomWidth={'1px'}
              py={3}>
              <VStack flex={1}>
                <Text fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
                  {resources[option].label}
                </Text>
              </VStack>

              <Radio.Group
                name={option}
                accessibilityLabel={option}
                value={language}>
                <Radio value={option}>
                  <></>
                </Radio>
              </Radio.Group>
            </HStack>
          </TouchableOpacity>
        ))}
      </VStack>

      <Button
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        background={'primary.200'}
        onPress={() => {
          i18n.changeLanguage(language);
          Navigation.goBack();
        }}>
        {t('settings.changeLanguage.button') || 'Next'}
      </Button>
    </VStack>
  );
};

export default ChangeLanguageScreen;
