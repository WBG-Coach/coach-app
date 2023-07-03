/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {useTranslation} from 'react-i18next';
import {isTablet as checkIsTablet} from 'react-native-device-info';
import {Center, FlatList, HStack, Text, VStack, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../components/Icon';
import {useCoachContext} from '../../../providers/coach.provider';
import PathRoutes from '../../../routers/paths';
import {useNavigate} from 'react-router-native';

const HorizontalMenu: React.FC = () => {
  const {selectSchool} = useCoachContext();
  const {t} = useTranslation();
  const isTablet = checkIsTablet();
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
      onPress: () => selectSchool(null),
    },
    {
      icon: 'chart-line',
      label: t('home.menu-items.statics'),
      onPress: () => navigate(PathRoutes.home.stats),
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
          <VStack
            h={'140px'}
            borderRadius={'16px'}
            borderWidth={'1px'}
            alignItems={'center'}
            borderColor={'gray.300'}
            maxW={isTablet ? '176px' : '130px'}>
            <TouchableOpacity onPress={item.onPress}>
              <VStack p={'12px 8px'} space={2}>
                <Center
                  py={isTablet ? 6 : 3}
                  px={isTablet ? '64px' : 9}
                  borderRadius={'8px'}
                  background={'primary.100'}>
                  <Icon name={item.icon as any} color={'#264673'} />
                </Center>

                <Text
                  fontSize={'TSM'}
                  color={'gray.800'}
                  fontWeight={400}
                  textAlign={'center'}>
                  {item.label}
                </Text>
              </VStack>
            </TouchableOpacity>
          </VStack>
        )}
      />
    </HStack>
  );
};

export default HorizontalMenu;
