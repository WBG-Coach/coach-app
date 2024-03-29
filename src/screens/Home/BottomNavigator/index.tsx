import {Center, HStack, VStack, Text} from 'native-base';
import React from 'react';
import Icon from '../../../components/Icon';
import {TouchableOpacity} from 'react-native';
import PathRoutes from '../../../routers/paths';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {COUNTRY} from '@env';

const BottomNavigator: React.FC = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();

  const CountriesItems: {
    [x: string]: [{label: string; icon: string; route: string}];
  } = {
    np: [
      {
        label: t('bottom_navigator.cop'),
        icon: 'process',
        route: PathRoutes.communityOfPractice.onboarding,
      },
    ],

    sl: [
      {
        label: t('bottom_navigator.tlc'),
        icon: 'process',
        route: PathRoutes.teacherLearningCircles.onboarding,
      },
    ],
  };

  const bottomItems = [
    {label: t('bottom_navigator.home'), icon: 'home-alt-solid', route: ''},
    ...(CountriesItems as any)[COUNTRY],
    {
      label: t('bottom_navigator.pending'),
      icon: 'comment-dots',
      route: PathRoutes.home.pendingSessions,
    },
  ];

  return (
    <HStack>
      {bottomItems.map((item, index) => (
        <TouchableOpacity
          style={{flex: 1}}
          key={index}
          onPress={() => navigate(item.route)}>
          <Center
            borderTopWidth={'1px'}
            borderTopColor={index === 0 ? 'gray.700' : 'gray.300'}
            py={2}>
            <VStack alignItems={'center'}>
              <Icon name={item.icon as any} />
              <Text color={'gray.700'}>{item.label}</Text>
            </VStack>
          </Center>
        </TouchableOpacity>
      ))}
    </HStack>
  );
};

export default BottomNavigator;
