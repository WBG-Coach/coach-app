import React, {useState} from 'react';
import {
  Center,
  HStack,
  Image,
  Modal,
  Text,
  useTheme,
  VStack,
} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useTranslation} from 'react-i18next';
import {Props} from './types';
import Icon from '../Icon';
import ImagePickerModal from '../ImagePickerModal';

const ImagePicker: React.FC<Props> = ({image, handleSelectImage}) => {
  const theme = useTheme();
  const {t} = useTranslation();
  const [showImagePicker, setShowImagePicker] = useState(false);

  const handleOpenGallery = async () => {
    const {assets} = await launchImageLibrary({
      mediaType: 'photo',
    });

    if (assets) {
      handleSelectImage({
        name: assets[0].fileName as string,
        value: assets[0].uri as string,
      });
    }

    setShowImagePicker(false);
  };

  const handleOpenCam = async () => {
    const {assets} = await launchCamera({
      mediaType: 'photo',
    });

    if (assets) {
      handleSelectImage({
        name: assets[0].fileName as string,
        value: assets[0].uri as string,
      });
    }

    setShowImagePicker(false);
  };

  return (
    <>
      <Center w={'100%'} my={6}>
        <VStack alignItems={'center'} space={1}>
          <Center
            w={'56px'}
            h={'56px'}
            borderRadius={'500px'}
            background={'primary.100'}>
            {image ? (
              <Image
                src={image?.value}
                w={'56px'}
                h={'56px'}
                borderRadius={'500px'}
                alt={'User image'}
              />
            ) : (
              <Icon name={'user'} />
            )}
          </Center>

          <TouchableOpacity onPress={() => setShowImagePicker(true)}>
            <Text fontSize={'LMD'} fontWeight={500} color={'primary.200'}>
              {t('login.createAccount.takePhoto')}
            </Text>
          </TouchableOpacity>
        </VStack>
      </Center>
      <ImagePickerModal
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        handleSelectImage={handleSelectImage}
      />
    </>
  );
};

export default ImagePicker;
