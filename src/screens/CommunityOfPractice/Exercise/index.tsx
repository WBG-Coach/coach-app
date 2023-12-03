import React, {useState} from 'react';
import {Props} from './types';
import Page from '../../../components/Page';
import {useTranslation} from 'react-i18next';
import {ExerciseItems} from './common';
import {
  HStack,
  Image,
  ScrollView,
  Text,
  TextArea,
  VStack,
  useTheme,
} from 'native-base';
import Button from '../../../components/Button';
import Icon from '../../../components/Icon';
import ImagePickerModal from '../../../components/ImagePickerModal';
import ImageCard from '../../../components/ImageCard';
import {useLocation, useNavigate} from 'react-router-native';
import {ImageService} from '../../../services/image.service';

const COPExercise: React.FC<Props> = ({type}) => {
  const theme = useTheme();
  const pageData = ExerciseItems[type];
  const {state} = useLocation();
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState<
    {name: string; value: string; created_at: number}[]
  >([]);
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [formStatus, setFormStatus] = useState({
    isLoading: false,
    isInvalid: false,
  });
  const navigate = useNavigate();
  const {t} = useTranslation();

  console.log(state);

  const handleSubmit = async () => {
    if (!inputValue) {
      setFormStatus({isInvalid: true, isLoading: false});
      return;
    }
    setFormStatus({isLoading: true, isInvalid: false});

    try {
      const imgs = await Promise.all(
        images.map(
          async image =>
            await ImageService.saveNewImage(image.name, image.value, ''),
        ),
      );

      navigate(pageData.next_route, {
        state: {
          ...state,
          [type]: {
            value: inputValue,
            images: imgs,
          },
        },
        replace: true,
      });
    } catch (err) {
      console.log(err);
    }
    setFormStatus({isLoading: false, isInvalid: false});
  };

  return (
    <Page back setting title={t(`cop.${type}.page_title`)}>
      <ScrollView>
        <Text fontSize={'HXS'} fontWeight={600} color={'gray.800'}>
          {t(`cop.${type}.title`)}
        </Text>

        <Image
          alignSelf={'center'}
          source={pageData.img}
          alt={'A guy looking into you phone'}
        />

        <Text fontSize={'LLG'} mt={6} fontWeight={500} color={'gray.800'}>
          {t(`cop.${type}.feedback.title`)}
        </Text>

        <TextArea
          mt={2}
          mb={6}
          value={inputValue}
          isInvalid={formStatus.isInvalid}
          autoCompleteType=""
          placeholder={t(`cop.${type}.feedback.placeholder`)}
          onChangeText={setInputValue}
        />

        <VStack flex={1}>
          <Text fontSize={'LLG'} fontWeight={500} color={'gray.700'}>
            {t(`cop.${type}.feedback.upload_title`)}
          </Text>

          <Text mt={1} fontSize={'TMD'} fontWeight={400} color={'gray.600'}>
            {t(`cop.${type}.feedback.upload_description`)}
          </Text>

          <Button
            mt={2}
            variant={'outlined'}
            onPress={() => setShowImagePicker(true)}>
            <HStack>
              <Icon name={'image'} color={theme.colors.primary['200']} />
              <Text
                ml={2}
                fontSize={'LMD'}
                fontWeight={500}
                color={'primary.200'}>
                {t('feedback.form.uploadPhoto')}
              </Text>
            </HStack>
          </Button>

          <VStack flex={1} space={2} mt={6}>
            {images.map((image: any, index) => (
              <ImageCard
                {...image}
                key={index}
                transformBase
                handleDelete={() => {
                  const imageCopy = images;
                  imageCopy.splice(index, 1);
                  setImages(JSON.parse(JSON.stringify(imageCopy)));
                }}
              />
            ))}
          </VStack>
        </VStack>
      </ScrollView>

      <Button
        pt={4}
        variant={'solid'}
        borderRadius={'8px'}
        color={'white'}
        isLoading={formStatus.isLoading}
        background={'primary.200'}
        onPress={handleSubmit}>
        {t('cop.checkingStats.button')}
      </Button>

      <ImagePickerModal
        isOpen={showImagePicker}
        onClose={() => setShowImagePicker(false)}
        handleSelectImage={asset =>
          setImages([...images, {...asset, created_at: Date.now()}])
        }
      />
    </Page>
  );
};

export default COPExercise;
