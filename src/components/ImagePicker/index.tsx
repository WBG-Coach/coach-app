import {HStack, Text, useTheme, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Icon from '../base/Icon';
import {Props} from './types';
import {useTranslation} from 'react-i18next';

const ImagePicker: React.FC<Props> = ({handleSelectImage, handleClose}) => {
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
    <VStack p={4}>
      <Text fontSize={'HXS'} fontWeight={600} color={'gray.700'}>
        {t('feedback.defineActions.uploadImage') || 'Upload a image'}
      </Text>
      <Text mt={2} fontSize={'TSM'} fontWeight={400} color={'gray.600'}>
        Choose the way you want do send the picture of your annotations
      </Text>

      <VStack w={'100%'} px={4} py={6}>
        <TouchableOpacity onPress={handleOpenCam}>
          <HStack
            alignItems={'center'}
            w={'100%'}
            py={4}
            borderBottomWidth={'1px'}
            borderBottomColor={'gray.200'}>
            <Text flex={1} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              Take photo
            </Text>
            <Icon name={'camera'} color={theme.colors.primary['200']} />
          </HStack>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleOpenGallery}>
          <HStack alignItems={'center'} w={'100%'} py={4}>
            <Text flex={1} fontSize={'LMD'} fontWeight={500} color={'gray.700'}>
              Photo gallery
            </Text>
            <Icon name={'image'} color={theme.colors.primary['200']} />
          </HStack>
        </TouchableOpacity>
      </VStack>
    </VStack>
  );
};

export default ImagePicker;
