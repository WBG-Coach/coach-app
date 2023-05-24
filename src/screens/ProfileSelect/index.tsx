import {Center, HStack, Image, Text, VStack} from 'native-base';
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
  const [filteredUsersList, setFilteredUsersList] = useState<User[]>();
  const {t} = useTranslation();
  const isTablet = Tablet();

  useEffect(() => {
    (async () => {
      const db = await getWatermelon();
      const list = await db.collections.get<User>('user').query().fetch();
      const users = await Promise.all(
        list.map(async user => ({
          ...user._raw,
          image: (await user.image.fetch())?._raw,
          sessions: await user.sessions.fetch(),
        })),
      );

      const usersFiltered = users.map(user => ({
        ...user,
        sessions: user.sessions.reduce(
          (acc, item) => [
            ...acc,
            ...(acc.includes((item._raw as any).teacher_id)
              ? []
              : [(item._raw as any).teacher_id]),
          ],
          [] as string[],
        ),
      }));

      setUsersList(usersFiltered as any);
      setFilteredUsersList(usersFiltered as any);
    })();
  }, []);

  const handleFilterProfile = (text: string) => {
    if (usersList) {
      const newSchools = usersList.filter(el => el.name.indexOf(text) > -1);
      setFilteredUsersList(newSchools);
    }
  };

  return (
    <VStack flex={1}>
      {filteredUsersList ? (
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

          <Input
            icon="search"
            marginBottom={2}
            placeholder={'Search'}
            onChangeText={handleFilterProfile}
          />

          <VStack w={'100%'} px={'16px'}>
            {filteredUsersList.map((user, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectProfile(user as any)}>
                <HStack
                  key={index}
                  w={'100%'}
                  py={'18px'}
                  borderBottomWidth={'1px'}
                  alignItems={'center'}
                  borderBottomColor={
                    filteredUsersList.length - 1 === index
                      ? 'transparent'
                      : 'gray.200'
                  }>
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
                      {t('setupUserData.profileSelect.lineDesc').replace(
                        '$val',
                        (user.sessions as any)?.length,
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
