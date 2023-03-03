import {Center, HStack, Image, Select, useTheme} from 'native-base';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {ImageStyle} from 'react-native/types';
import {LogoXXXS} from '../../assets/images/logos';
import i18n, {resources} from '../../i18n';
import Icon from '../base/Icon';

const Header: React.FC = () => {
  const currentLanguage = i18n.languages[0];
  const theme = useTheme();
  useTranslation();

  return (
    <Center w={'100%'} p={'16px'} safeAreaTop>
      <Image
        source={LogoXXXS}
        style={{height: 24, width: 64} as ImageStyle}
        alt={'Coach logo'}
      />
      <HStack
        position={'absolute'}
        alignItems={'center'}
        right={'16px'}
        bottom={'8px'}>
        <Icon name={'globe'} color={theme.colors.primary[200]} />
        <Select
          minW={'60px'}
          dropdownIcon={
            <Icon name={'angle-down'} color={theme.colors.primary[200]} />
          }
          selectedValue={currentLanguage}
          onValueChange={i18n.changeLanguage}
          borderWidth={0}
          color={'primary.200'}
          fontSize={'TMD'}
          fontWeight={500}>
          {Object.keys(resources).map(resource => (
            <Select.Item
              key={resource}
              label={resource.toUpperCase()}
              value={resource}
            />
          ))}
        </Select>
      </HStack>
    </Center>
  );
};

export default Header;
