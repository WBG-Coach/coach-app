import {HStack, Image, Text, VStack} from 'native-base';
import React from 'react';
import Icon from '../../components/base/Icon';
import {TouchableOpacity} from 'react-native';
import Navigation from '../../services/navigation';
import Routes from '../../routes/paths';
import Input from '../../components/base/Input';

const SchoolSelectScreen = () => {
  const mock = [
    {
      id: '1',
      name: 'Bayshore High',
      image_url: 'https://i.ibb.co/VqKhx46/Image-12.png',
      description: '4 coaches here',
    },
    {
      id: '2',
      name: 'Angelwood Elementary',
      image_url: 'https://i.ibb.co/X8r613d/Image-15.png',
      description: '5 coaches here',
    },
    {
      id: '3',
      name: 'Pine Hill Charter School',
      image_url: 'https://i.ibb.co/tPVsMTY/Image-13.png',
      description: '1 coach here',
    },
  ];

  return (
    <VStack flex={1}>
      <VStack w={'100%'} alignItems={'flex-start'} px={'16px'} mt={'24px'}>
        <Text fontSize={'HSM'} fontWeight={600} color={'gray.700'} mb={'16px'}>
          Select the school
        </Text>

        <Input icon="search" marginBottom={2} mb={2} placeholder={'Search'} />

        <VStack w={'100%'} px={'16px'}>
          {mock.map((school, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                Navigation.push(Routes.setupUserData.ProfileSelect, {school})
              }>
              <HStack
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
                  src={school.image_url}
                  alt={`Image of ${school.name}`}
                  borderRadius={'20px'}
                />

                <VStack flex={1} ml={'8px'} space={'4px'}>
                  <Text color={'gray.700'}>{school.name}</Text>
                  <Text color={'gray.600'}>{school.description}</Text>
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

export default SchoolSelectScreen;
