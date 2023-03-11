import {Box, Text, HStack, Image, useTheme} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageStyle} from 'react-native/types';
import {LogoXXXS} from '../../assets/images/logos';
import Navigation from '../../services/navigation';
import Icon from '../base/Icon';
import {Props} from './types';

const Header: React.FC<Props> = ({hideBack, hideConfig, title}) => {
  /*   const currentLanguage = i18n.languages[0]; */
  const theme = useTheme();

  return (
    <HStack
      w={'100%'}
      p={'16px'}
      alignItems={'center'}
      justifyContent={'center'}
      safeAreaTop>
      {!hideBack && (
        <Box position={'absolute'} alignItems={'center'} left={'16px'}>
          <TouchableOpacity onPress={() => Navigation.goBack()}>
            <Icon name={'angle-left'} color={theme.colors.primary[200]} />
          </TouchableOpacity>
        </Box>
      )}

      {title ? (
        <Text color={'primary.200'} fontSize={'TMD'} fontWeight={700}>
          {title}
        </Text>
      ) : (
        <Image
          alignSelf={'center'}
          source={LogoXXXS}
          style={{height: 24, width: 64} as ImageStyle}
          alt={'Coach logo'}
        />
      )}

      {!hideConfig && (
        <Box position={'absolute'} alignItems={'center'} right={'16px'}>
          <TouchableOpacity>
            <Icon name={'setting'} color={theme.colors.primary[200]} />
          </TouchableOpacity>
        </Box>
      )}
    </HStack>
  );
};

export default Header;

{
  /*  <HStack
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
      </HStack> */
}
