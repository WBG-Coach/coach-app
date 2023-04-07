import {
  Box,
  Button,
  Center,
  FlatList,
  HStack,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import React from 'react';
import Icon from '../../../components/base/Icon';
import Routes from '../../../routes/paths';
import Navigation from '../../../services/navigation';
import {isTablet as Tablet} from 'react-native-device-info';

const process = [
  {
    title: 'Preparation',
    estimated: '5min',
    description:
      'Talk to the teacher before the class and review your notes if you already had a coach observation before.',
  },
  {
    title: 'Classroom observation',
    estimated: '30-45min',
    description:
      'Sit at the back of the class to make notes and remember to put your phone in silent mode.',
  },
  {
    title: 'Coaching conversation',
    estimated: '20-30min',
    description:
      'Present to the teacher your observations, pointing the positive and negative points of their class.',
  },
  {
    title: 'Next steps',
    estimated: '5min',
    description:
      'After agreeing with the teacher about the  key next steps, schedule the next visit. ',
  },
];

const ClassObservationCreate: React.FC<any> = () => {
  const theme = useTheme();
  const isTablet = Tablet();

  return (
    <VStack flex={1} mt={6} px={isTablet ? '64px' : 4} safeAreaBottom>
      <VStack flex={1} position={'relative'}>
        <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          Mentoring process
        </Text>

        <HStack mt={6} position={'relative'}>
          <Box
            w={'4px'}
            left={'18px'}
            h={'85%'}
            background={'primary.100'}
            position={'absolute'}
          />

          <FlatList
            data={process}
            ItemSeparatorComponent={() => <View h={'14px'} />}
            renderItem={({item}) => (
              <>
                <Center
                  position={'absolute'}
                  top={0}
                  left={'-0px'}
                  w={'40px'}
                  h={'40px'}
                  background={'primary.100'}
                  zIndex={2}
                  borderRadius={'500px'}>
                  <Icon
                    name={'university'}
                    color={theme.colors.primary['200']}
                  />
                </Center>

                <VStack space={1} ml={'50px'}>
                  <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
                    {item.title}
                  </Text>
                  <Text fontSize={'TXS'} fontWeight={400} color={'gray.700'}>
                    {item.estimated}
                  </Text>
                  <Text fontSize={'TSM'} fontWeight={400} color={'gray.700'}>
                    {item.description}
                  </Text>
                </VStack>
              </>
            )}
          />
        </HStack>
      </VStack>
      <Button
        mb={6}
        w={'100%'}
        py={3}
        borderRadius={'8px'}
        background={'primary.200'}
        onPress={() => Navigation.navigate(Routes.classObservation.onboarding)}>
        Start preparation
      </Button>
    </VStack>
  );
};

export default ClassObservationCreate;
