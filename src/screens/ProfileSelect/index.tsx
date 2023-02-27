import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import Icon from '../../components/Icon';

const ProfileSelectScreen = () => {
  const mock = [
    {
      name: 'Jane Cooper',
      image_url:
        'https://i.ibb.co/5Fhsdrp/avatar-1168c22a404d4e1acfc83d4bc35c9527.jpg',
      description: 'Coaching 4 schools',
    },
    {
      name: 'Esther Howard',
      image_url:
        'https://i.ibb.co/PTB0MwJ/avatar-111332073ddbd15ba0d337e8ca0818d3.jpg',
      description: 'Coaching 1 schools',
    },
  ];

  return (
    <VStack flex={1}>
      <VStack w={'100%'} alignItems={'flex-start'} px={'16px'} mt={'24px'}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'24px'}>
          Select your profile
        </Text>

        {mock.map((user, index) => (
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
        ))}
      </VStack>
    </VStack>
  );
};

export default ProfileSelectScreen;
