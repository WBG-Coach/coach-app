import {Box, Text, HStack, Image, useTheme, Stack} from 'native-base';
import React, {useMemo} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {ImageStyle} from 'react-native/types';
import Navigation from '../../services/navigation';
import Icon from '../base/Icon';
import {Props} from './types';
import {isTablet as Tablet} from 'react-native-device-info';
import Routes from '../../routes/paths';
import {MobileLogo, TabletLogo} from '../../assets/images/logos';

const Header: React.FC<Props> = ({hideBack, hideConfig, title, background}) => {
  /*   const currentLanguage = i18n.languages[0]; */
  const isTablet = useMemo(() => Tablet(), []);
  const theme = useTheme();

  return useMemo(
    () => (
      <Stack
        p={'16px'}
        safeAreaTop
        px={isTablet ? '32px' : '16px'}
        {...(background && {background: background})}>
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
              source={isTablet ? TabletLogo : MobileLogo}
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
    ),
    [title, background, hideConfig, hideBack],
  );
};

export default Header;
