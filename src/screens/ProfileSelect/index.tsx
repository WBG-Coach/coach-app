import {HStack, Image, Text, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Icon from '../../components/base/Icon';
import Input from '../../components/base/Input';
import {UserContext} from '../../providers/contexts/UserContext';
import {TouchableOpacity} from 'react-native';
import User from '../../database/models/User';
import {getWatermelon} from '../../database';
import {isTablet as Tablet} from 'react-native-device-info';
import {useTranslation} from 'react-i18next';

const ProfileSelectScreen: React.FC = () => {
  const {handleSelectProfile} = useContext(UserContext);
  const [usersList, setUsersList] = useState<User[]>();
  const {t} = useTranslation();
  const isTablet = Tablet();

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const list = await db.collections.get<User>('user').query().fetch();

      setUsersList(list);
    })();
  }, []);

  return (
    <VStack flex={1}>
      {usersList ? (
        <VStack
          w={'100%'}
          alignItems={'flex-start'}
          px={isTablet ? '64px' : '16px'}
          mt={isTablet ? '64px' : '24px'}>
          <Text
            fontSize={'HSM'}
            fontWeight={600}
            color={'gray.700'}
            mb={'16px'}>
            {t('setupUserData.profileSelect.title')}
          </Text>

          <Input icon="search" marginBottom={2} placeholder={'Search'} />

          <VStack w={'100%'} px={'16px'}>
            {usersList.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectProfile(user._raw as any)}>
                <HStack
                  key={index}
                  w={'100%'}
                  py={'18px'}
                  borderBottomWidth={'1px'}
                  alignItems={'center'}
                  borderBottomColor={
                    usersList.length - 1 === index ? 'transparent' : 'gray.200'
                  }>
                  <Image
                    w={'40px'}
                    h={'40px'}
                    src={user.image_url}
                    alt={`Image of ${user.name}`}
                    borderRadius={'20px'}
                  />

                  <VStack flex={1} ml={'8px'} space={'4px'}>
                    <Text color={'gray.700'}>{user.name}</Text>
                    <Text color={'gray.600'}>
                      {t('setupUserData.profileSelect.lineDesc').replace(
                        '$val',
                        '3',
                      )}
                    </Text>
                  </VStack>

                  <Icon name={'angle-right'} />
                </HStack>
              </TouchableOpacity>
            ))}
          </VStack>
        </VStack>
      ) : (
        <></>
      )}
    </VStack>
  );
};

export default ProfileSelectScreen;
