import {HStack, Image, Text, VStack} from 'native-base';
import React, {useContext} from 'react';
import Icon from '../../components/base/Icon';
import Input from '../../components/base/Input';
import {UserContext} from '../../providers/contexts/UserContext';
import {TouchableOpacity} from 'react-native';
import {ISchool} from '../../types';

type Props = {
  route: {
    params: {
      school: ISchool;
    };
  };
};

const ProfileSelectScreen: React.FC<any> = ({route}: Props) => {
  const {handleLogin} = useContext(UserContext);

  const mock = [
    {
      id: '1',
      name: 'Jane Cooper',
      image_url:
        'https://i.ibb.co/5Fhsdrp/avatar-1168c22a404d4e1acfc83d4bc35c9527.jpg',
      description: 'Coaching 4 schools',
    },
    {
      id: '2',
      name: 'Esther Howard',
      image_url:
        'https://i.ibb.co/PTB0MwJ/avatar-111332073ddbd15ba0d337e8ca0818d3.jpg',
      description: 'Coaching 1 schools',
    },
  ];

  return (
    <VStack flex={1}>
      <VStack w={'100%'} alignItems={'flex-start'} px={'16px'} mt={'24px'}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
          Select your profile
        </Text>

        <Input icon="search" marginBottom={2} placeholder={'Search'} />

        <VStack w={'100%'} px={'16px'}>
          {mock.map((user, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                handleLogin({...user, school: route.params.school})
              }>
              <HStack
                key={index}
                w={'100%'}
                py={'18px'}
                borderBottomWidth={'1px'}
                alignItems={'center'}
                borderBottomColor={
                  mock.length - 1 === index ? 'transparent' : 'gray.200'
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
                  <Text color={'gray.600'}>{user.description}</Text>
                </VStack>

                <Icon name={'angle-right'} />
              </HStack>
            </TouchableOpacity>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};

export default ProfileSelectScreen;
