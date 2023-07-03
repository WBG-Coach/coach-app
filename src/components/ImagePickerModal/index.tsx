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

const ImagePickerModal: React.FC<Props> = ({
  isOpen,
  onClose: handleClose,
  handleSelectImage,
}) => {
  const theme = useTheme();
  const {t} = useTranslation();

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

    handleClose();
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

    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} justifyContent="flex-end">
      <VStack bg="white" w="full" p={4}>
        <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
          {t('common.image-picker.upload-image-modal-title')}
        </Text>
        <Text mt={2} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
          {t('common.image-picker.upload-image-modal-description')}
        </Text>

        <VStack w={'100%'} px={4} py={6}>
          <TouchableOpacity onPress={handleOpenCam}>
            <HStack
              alignItems={'center'}
              w={'100%'}
              py={4}
              borderBottomWidth={'1px'}
              borderBottomColor={'gray.200'}>
              <Text
                flex={1}
                fontSize={'LMD'}
                fontWeight={500}
                color={'gray.700'}>
                {t('common.image-picker.take-photo-button')}
              </Text>
              <Icon name={'camera'} color={theme.colors.primary['200']} />
            </HStack>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOpenGallery}>
            <HStack alignItems={'center'} w={'100%'} py={4}>
              <Text
                flex={1}
                fontSize={'LMD'}
                fontWeight={500}
                color={'gray.700'}>
                {t('common.image-picker.photo-gallery-button')}
              </Text>
              <Icon name={'image'} color={theme.colors.primary['200']} />
            </HStack>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default ImagePickerModal;
