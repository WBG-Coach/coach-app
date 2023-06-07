import {Button, Image, Text, VStack} from 'native-base';
import {GeolocationImage} from '../../assets/images/globals';
import {useTranslation} from 'react-i18next';

type Props = {
  requestPermission: () => void;
};

const NoGeolocation: React.FC<Props> = ({requestPermission}) => {
  const {t} = useTranslation();

  return (
    <>
      <VStack flex={1} m="auto" maxW="328px">
        <VStack flex={1} alignItems="center" justifyContent="center">
          <Image alignSelf={'center'} source={GeolocationImage} />
          <Text
            mb={'4px'}
            mt={'24px'}
            textAlign="center"
            fontSize="HXS"
            fontWeight="600"
            color="gray.700">
            {t('noGeolocation.title')}
          </Text>
          <Text
            textAlign="center"
            fontFamily="Inter"
            fontSize="LLG"
            fontWeight="400"
            color="gray.600">
            {t('noGeolocation.description')}
          </Text>
        </VStack>
        <Button
          mb="24px"
          color={'white'}
          variant={'solid'}
          borderRadius={'8px'}
          background={'primary.200'}
          onPress={requestPermission}>
          <Text>{t('noGeolocation.allowButton')}</Text>
        </Button>
      </VStack>
    </>
  );
};

export default NoGeolocation;
