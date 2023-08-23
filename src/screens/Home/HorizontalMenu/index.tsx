/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Center, FlatList, HStack, Text, VStack, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../components/Icon';
import {useCoachContext} from '../../../providers/coach.provider';
import PathRoutes from '../../../routers/paths';
import {useNavigate} from 'react-router-native';

const HorizontalMenu: React.FC = () => {
  const {logout} = useCoachContext();
  const {t} = useTranslation();
  const navigate = useNavigate();

  const MENU_ITEMS = [
    {
      icon: 'plus',
      label: t('home.menu-items.newSession'),
      onPress: () => navigate(PathRoutes.home.newSession),
    },
    {
      icon: 'comment-dots',
      label: t('home.menu-items.pendingSession'),
      onPress: () => navigate(PathRoutes.home.pendingSessions),
    },
    {
      icon: 'university',
      label: t('home.menu-items.switchSchools'),
      onPress: () => logout,
    },
    {
      icon: 'chart-line',
      label: t('home.menu-items.statics'),
      onPress: () => navigate(PathRoutes.home.stats),
    },
    {
      icon: 'signout',
      label: t('home.menu-items.startOver'),
      onPress: logout,
    },
  ];

  return (
    <HStack mt={6}>
      <FlatList
        data={MENU_ITEMS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={({label}) => label}
        ItemSeparatorComponent={() => <View w={'8px'} />}
        renderItem={({item}) => (
          <TouchableOpacity onPress={item.onPress}>
            <VStack
              px="12px"
              py="8px"
              space={2}
              h="124px"
              borderWidth={'1px'}
              borderRadius={'16px'}
              borderColor={'gray.300'}>
              <Center
                py={'12px'}
                px={'32px'}
                borderRadius={'8px'}
                background={'primary.100'}>
                <Icon name={item.icon as any} color={'#264673'} size={32} />
              </Center>

              <Text
                maxW="96px"
                fontSize={'TSM'}
                color={'gray.800'}
                fontWeight={400}
                textAlign={'center'}>
                {item.label}
              </Text>
            </VStack>
          </TouchableOpacity>
        )}
      />
    </HStack>
  );
};

export default HorizontalMenu;
