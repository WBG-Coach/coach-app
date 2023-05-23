import moment from 'moment';
import {
  Center,
  FlatList,
  HStack,
  Image,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from '../base/Icon';
import {Props} from './types';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useClickOutside} from 'react-native-click-outside';
import {View} from 'react-native';
import RNFS from 'react-native-fs';

const ImageCard: React.FC<Props> = ({
  name,
  created_at,
  handleDelete,
  transformBase,
  value,
}) => {
  const theme = useTheme();
  const opacity = useSharedValue(0);
  const [showImage, setShowImage] = useState<string>();
  const dropdownStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const openDropdown = () => (opacity.value = withTiming(1));
  const closeDropdown = () => (opacity.value = withTiming(0));
  const ref = useClickOutside<View>(closeDropdown);

  const getImage = async () => {
    let file = value;
    if (transformBase)
      file = 'data:image/png;base64,' + (await RNFS.readFile(value, 'base64'));

    setShowImage(file);
  };

  const options = [
    {
      label: 'View',
      icon: 'eye',
      onPress: async () => await getImage(),
    },
    ...(handleDelete
      ? [{label: 'Delete', icon: 'trash-alt', onPress: () => handleDelete()}]
      : []),
  ];

  return (
    <HStack
      py={2}
      px={3}
      borderRadius={'8px'}
      borderColor={'gray.200'}
      borderWidth={'2px'}
      alignItems={'center'}
      position={'relative'}
      ref={ref}>
      <Center w={'64px'} h={'64px'} background={'primary.0'}>
        <Icon name={'image'} />
      </Center>
      <HStack justifyContent={'space-between'} flex={1} alignItems={'center'}>
        <VStack ml={2} maxW={'50%'} overflow={'hidden'} space={0.5}>
          <Text
            numberOfLines={1}
            fontSize={'LMD'}
            fontWeight={500}
            color={'gray.700'}>
            {name}
          </Text>
          <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
            {moment(new Date(new Date(created_at))).format(
              'DD MMM, YYYY - HH:mm',
            )}
          </Text>

          <HStack space={1} alignItems={'center'}>
            <Icon
              name={'check-circle-solid'}
              color={theme.colors.green['200']}
              size={16}
            />

            <Text fontSize={'TXS'} fontWeight={400} color={'green.300'}>
              Image sent
            </Text>
          </HStack>
        </VStack>

        <TouchableOpacity onPress={openDropdown}>
          <Icon name={'ellipsis-v'} />
        </TouchableOpacity>
      </HStack>

      <Animated.View
        style={[
          dropdownStyle,
          {
            position: 'absolute',
            right: 42,
            bottom: 30,
          },
        ]}>
        <VStack
          w={'284px'}
          borderColor={'gray.100'}
          borderWidth={'1px'}
          background={'white'}
          py={2}
          px={1}
          borderRadius={'8px'}>
          <FlatList
            data={options}
            scrollEnabled={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  closeDropdown(), item.onPress();
                }}>
                <HStack
                  py={4}
                  px={3}
                  alignItems={'center'}
                  justifyContent={'space-between'}>
                  <Text fontSize={'LMD'} fontWeight={500} color={'gray.800'}>
                    {item.label}
                  </Text>

                  <Icon name={item.icon} size={22} />
                </HStack>
              </TouchableOpacity>
            )}
          />
        </VStack>
      </Animated.View>

      <Modal
        isOpen={!!showImage}
        onClose={() => setShowImage(undefined)}
        size={'lg'}>
        <Modal.Content background={'white'}>
          <Modal.CloseButton />
          <Modal.Header color={'black'}>Image view</Modal.Header>
          <Modal.Body p={0}>
            {showImage && (
              <Center h={'lg'}>
                <Image
                  source={{uri: showImage}}
                  alt={'Teacher image'}
                  w={'100%'}
                  h={'100%'}
                />
              </Center>
            )}
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </HStack>
  );
};

export default ImageCard;
