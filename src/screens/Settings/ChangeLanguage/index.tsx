import React, {useState} from 'react';
import {Button, HStack, Radio, Text, VStack} from 'native-base';
import {useNavigate} from 'react-router-native';
import i18n, {resources} from '../../../i18n';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import Page from '../../../components/Page';

const ChangeLanguageScreen: React.FC = () => {
  const currentLanguage = i18n.languages[0];
  const [language, setLanguage] = useState(currentLanguage);
  const navigation = useNavigate();
  const {t} = useTranslation();

  return (
    <Page back title={t('settings.changeLanguage.title')}>
      <VStack flex={1} space={4}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'}>
          {t('settings.changeLanguage.title')}
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
          navigation(-1);
        }}>
        {t('settings.changeLanguage.button')}
      </Button>
    </Page>
  );
};

export default ChangeLanguageScreen;
