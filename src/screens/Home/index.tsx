import {
  Center,
  FlatList,
  HStack,
  Image,
  Text,
  useTheme,
  View,
  VStack,
} from 'native-base';
import React, {useContext} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../../components/base/Icon';
import {UserContext} from '../../providers/contexts/UserContext';
import {ISession, ITeacher} from '../../types';

const HomeScreen = () => {
  const {user} = useContext(UserContext);
  const theme = useTheme();

  const data = [
    {
      icon: 'graph-bar',
      label: 'Start new session',
      onPress: () => {},
    },
    {
      icon: 'university',
      label: 'Switch schools',
      onPress: () => {},
    },
    {
      icon: 'wifi-slash',
      label: 'Offline sync',
      onPress: () => {},
    },
    {
      icon: 'plus',
      label: 'Statistics',
      onPress: () => {},
    },
  ];

  const teachers: Array<ITeacher & {sessions: Partial<ISession>[]}> = [
    {
      id: '0',
      name: 'Jane Cooper',
      subject: 'Math',
      image_url: 'https://i.ibb.co/64f9VR1/Image-17.png',
      sessions: [
        {
          id: '0',
        },
      ],
    },
    {
      id: '1',
      name: 'Wade Warren',
      subject: 'Math',
      image_url: 'https://i.ibb.co/64f9VR1/Image-17.png',
      sessions: [
        {
          id: '0',
        },
        {
          id: '0',
        },
      ],
    },
    {
      id: '2',
      name: 'Esther Howard',
      subject: 'History',
      image_url: 'https://i.ibb.co/1GsTbDq/Image-18.png',
      sessions: [
        {
          id: '0',
        },
      ],
    },
  ];

  return (
    <VStack safeAreaBottom mt={6} px={4} flex={1}>
      <HStack space={2}>
        <Image
          src={user?.school?.image_url}
          alt={'School image'}
          w={'56px'}
          h={'56px'}
          borderRadius={'500px'}
        />

        <VStack space={2}>
          <Text fontSize={'TMD'} fontWeight={600} color={'gray.800'}>
            {user?.school?.name}
          </Text>
          <Text fontSize={'TMD'} fontWeight={400} color={'gray.800'}>
            3 Teachers being coached
          </Text>
        </VStack>
      </HStack>

      <HStack mt={6}>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={({label}) => label}
          ItemSeparatorComponent={() => <View w={'8px'} />}
          renderItem={({item}) => (
            <VStack
              borderRadius={'16px'}
              borderWidth={'1px'}
              alignItems={'center'}
              borderColor={'gray.300'}
              maxW={'130px'}>
              <TouchableOpacity onPress={item.onPress}>
                <VStack p={'12px 8px'} space={2}>
                  <Center
                    py={3}
                    px={9}
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

      <VStack>
        <Text mt={6} fontSize={'HSM'} fontWeight={600} color={'gray.800'}>
          Teachers
        </Text>

        <FlatList
          keyExtractor={({id}) => id}
          data={teachers}
          mb={5}
          renderItem={({item}) => (
            <TouchableOpacity>
              <HStack
                py={3}
                px={4}
                w={'100%'}
                alignItems={'center'}
                borderBottomWidth={'1px'}
                borderBottomColor={'gray.300'}>
                <HStack flex={1} space={2} alignItems={'center'}>
                  <Image
                    src={item.image_url}
                    alt={'Teacher image'}
                    w={'40px'}
                    h={'40px'}
                    borderRadius={'500px'}
                  />

                  <VStack space={1}>
                    <Text fontSize={'LLG'} fontWeight={500} color={'gray.800'}>
                      {item.name}
                    </Text>
                    <Text fontSize={'TSM'} fontWeight={500} color={'gray.700'}>
                      {item.subject}
                    </Text>

                    <HStack space={1}>
                      <HStack
                        alignItems={'center'}
                        borderRadius={'4px'}
                        background={'green.100'}
                        px={2}
                        py={1}
                        space={1}>
                        <Icon name={'thumbs-up'} size={15} />
                        <Text
                          fontSize={'TSM'}
                          fontWeight={500}
                          color={'gray.700'}>
                          1
                        </Text>
                      </HStack>

                      <HStack
                        alignItems={'center'}
                        borderRadius={'4px'}
                        background={'red.100'}
                        px={2}
                        py={1}
                        space={1}>
                        <Icon name={'thumbs-up'} size={15} />
                        <Text
                          fontSize={'TSM'}
                          fontWeight={500}
                          color={'gray.700'}>
                          1
                        </Text>
                      </HStack>

                      <HStack
                        alignItems={'center'}
                        borderRadius={'4px'}
                        background={'primary.100'}
                        px={2}
                        py={1}
                        space={1}>
                        <Icon name={'clipboard-notes'} size={15} />
                        <Text
                          fontSize={'TSM'}
                          fontWeight={500}
                          color={'gray.700'}>
                          {item.sessions.length}{' '}
                          {item.sessions.length > 1 ? 'Sessions' : 'Session'}
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </HStack>
                <Icon name={'angle-right'} />
              </HStack>
            </TouchableOpacity>
          )}
        />

        <TouchableOpacity>
          <HStack alignSelf={'center'} space={3} alignItems={'center'}>
            <Icon name={'plus'} color={theme.colors.primary[200]} />
            <Text color={'primary.200'}>Add new teacher</Text>
          </HStack>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

export default HomeScreen;
