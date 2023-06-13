import {useTranslation} from 'react-i18next';
import Navigation from '../../../services/navigation';
import Routes from '../../../routes/paths';
import {isTablet as checkIsTablet} from 'react-native-device-info';
import {useContext, useMemo} from 'react';
import {UserContext} from '../../../providers/contexts/UserContext';
import {Center, FlatList, HStack, Text, VStack, View} from 'native-base';
import {TouchableOpacity} from 'react-native';
import Icon from '../../../components/base/Icon';

const HorizontalMenu: React.FC = () => {
  const {handleSwitchSchool, handleSwitchProfile} = useContext(UserContext);
  const {t} = useTranslation();
  const isTablet = checkIsTablet();

  const MENU_ITEMS = [
    {
      icon: 'plus',
      label: t('home.items.newSession'),
      onPress: () => Navigation.navigate(Routes.quickAccess.newSession),
    },
    {
      icon: 'comment-dots',
      label: t('home.items.pendingSession'),
      onPress: () => Navigation.navigate(Routes.pendingSessions),
    },
    {
      icon: 'university',
      label: t('home.items.switchSchools'),
      onPress: handleSwitchSchool,
    },
    {
      icon: 'user',
      label: t('home.items.switchProfile'),
      onPress: handleSwitchProfile,
    },
    {
      icon: 'chart-line',
      label: t('home.items.statics'),
      onPress: () => Navigation.navigate(Routes.quickAccess.stats),
    },
  ];

  return useMemo(
    () => (
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
                    <Icon name={item.icon} color={'#264673'} />
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
    ),
    [],
  );
};

export default HorizontalMenu;
