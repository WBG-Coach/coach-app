import moment from 'moment';
import {
  Center,
  HStack,
  Image,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import Icon from '../Icon';
import {Props} from './types';
import RNFS from 'react-native-fs';
import {TouchableOpacity} from 'react-native';

const ImageCard: React.FC<Props> = ({
  name,
  created_at,
  handleDelete,
  transformBase,
  value,
}) => {
  const theme = useTheme();
  const [showImage, setShowImage] = useState<string>();

  const getImage = async () => {
    let file = value;
    if (transformBase && value) {
      file = 'data:image/png;base64,' + (await RNFS.readFile(value, 'base64'));
    }
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
    <VStack borderRadius={'8px'} borderColor={'gray.200'} borderWidth={'2px'}>
      <HStack py={2} px={3} alignItems={'center'} position={'relative'}>
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
        </HStack>
      </HStack>

      <HStack justifyContent="flex-end">
        {options.map((option, index) => (
          <TouchableOpacity key={index} onPress={option.onPress}>
            <HStack
              py={4}
              px={3}
              alignItems={'center'}
              justifyContent={'space-between'}>
              <Text mr={2} fontSize={'LMD'} fontWeight={500} color={'gray.800'}>
                {option.label}
              </Text>

              <Icon name={option.icon} size={22} />
            </HStack>
          </TouchableOpacity>
        ))}
      </HStack>

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
    </VStack>
  );
};

export default ImageCard;
