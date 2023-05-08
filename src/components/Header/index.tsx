import {Box, Text, HStack, Image, useTheme, Stack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageStyle} from 'react-native/types';
import {LogoXXXS} from '../../assets/images/logos';
import Navigation from '../../services/navigation';
import Icon from '../base/Icon';
import {Props} from './types';
import {isTablet as Tablet} from 'react-native-device-info';
import Routes from '../../routes/paths';

const Header: React.FC<Props> = ({hideBack, hideConfig, title, background}) => {
  /*   const currentLanguage = i18n.languages[0]; */
  const isTablet = Tablet();
  const theme = useTheme();

  return (
    <Stack
      safeAreaTop
      {...(background && {background: background})}
      p={'16px'}
      px={isTablet ? '64px' : '16px'}>
      <HStack
        w={'100%'}
        alignItems={'center'}
        justifyContent={'center'}
        position={'relative'}>
        {!hideBack && (
          <Box position={'absolute'} left={0}>
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
            style={
              {
                height: isTablet ? 32 : 24,
                width: isTablet ? 100 : 64,
              } as ImageStyle
            }
            alt={'Coach logo'}
          />
        )}

        {!hideConfig && (
          <Box position={'absolute'} right={0}>
            <TouchableOpacity
              onPress={() => Navigation.navigate(Routes.settings.settings)}>
              <Icon name={'setting'} color={theme.colors.primary[200]} />
            </TouchableOpacity>
          </Box>
        )}
      </HStack>
    </Stack>
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
