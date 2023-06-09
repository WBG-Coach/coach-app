/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import {Center, HStack, Image, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import User from '../../../database/models/User';
import Icon from '../../../components/base/Icon';
import {useTranslation} from 'react-i18next';
import {useMemo} from 'react';

type Props = {
  user: User;
  isFirst?: boolean;
  index?: string | number;
  onPress: () => void;
};

const UserItem: React.FC<Props> = ({onPress, user, index, isFirst}) => {
  const {t} = useTranslation();

  return useMemo(
    () => (
      <TouchableOpacity key={index} onPress={onPress}>
        <HStack
          w={'100%'}
          py={'18px'}
          key={index}
          alignItems={'center'}
          borderTopWidth={'1px'}
          borderColor={isFirst ? 'transparent' : 'gray.200'}>
          <Center
            w={'40px'}
            h={'40px'}
            borderRadius={'500px'}
            background={'primary.100'}>
            {user?.image?.value ? (
              <Image
                w={'100%'}
                h={'100%'}
                src={user?.image?.value}
                alt={`Image of ${user.name}`}
                borderRadius={'20px'}
              />
            ) : (
              <Icon name={'user'} />
            )}
          </Center>

          <VStack flex={1} ml={'8px'} space={'4px'}>
            <Text color={'gray.700'}>{user.name}</Text>
            <Text color={'gray.600'}>
              {t('setupUserData.profileSelect.lineDesc', {
                count: user.teacherCoachingCount || 0,
              })}
            </Text>
          </VStack>

          <Icon name={'angle-right'} />
        </HStack>
      </TouchableOpacity>
    ),
    [],
  );
};

export default UserItem;
