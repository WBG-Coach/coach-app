import {Box, Button, Image, Modal, Text, VStack} from 'native-base';

import Page from '../../components/Page';
import {useTranslation} from 'react-i18next';
import {QrCodeImg} from '../../assets/images/scan';

import QRCodeScanner from 'react-native-qrcode-scanner';
import {useState} from 'react';
import {School} from '../../types/school';
import {BarCodeReadEvent} from 'react-native-camera';
import {useCoachContext} from '../../providers/coach.provider';
import {Dimensions} from 'react-native';
import Header from '../../components/Header';
import PathRoutes from '../../routers/paths';
import {useNavigate} from 'react-router-native';

const AboutScan: React.FC = () => {
  const {t} = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const {selectSchool} = useCoachContext();
  const navigate = useNavigate();

  const onRead = (e: BarCodeReadEvent) => {
    const school: School = JSON.parse(e.data);
    selectSchool(school);

    navigate(PathRoutes.syncDetails, {replace: true});
  };

  const {height, width} = Dimensions.get('screen');

  return (
    <Page setting>
      <VStack my="auto">
        <Image w="172px" h="172px" mt="45px" source={QrCodeImg} mx="auto" />
        <Text
          mt="24px"
          textAlign="center"
          fontSize={20}
          color="#111417"
          fontWeight="600">
          {t('aboutScan.title')}
        </Text>
        <Text mt="4px" color="#576375" fontSize={16} textAlign="center">
          {t('aboutScan.description')}
        </Text>
      </VStack>
      <Button
        bg="#3373CC"
        mt="auto"
        _text={{fontWeight: 500, fontSize: 16}}
        onPress={() => setIsOpen(true)}>
        {t('aboutScan.scan')}
      </Button>
      <Button
        mt="16px"
        bg="transparent"
        _pressed={{bg: '#3373CC22'}}
        onPress={() => navigate(PathRoutes.selectSchool)}
        _text={{color: '#3373CC', fontWeight: 500, fontSize: 16}}>
        {t('aboutScan.doItLater')}
      </Button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <VStack position="relative">
          <QRCodeScanner onRead={onRead} cameraStyle={{height}} />

          <Box
            w={width / 2}
            h={width / 2}
            right={width / 4}
            borderWidth="2px"
            position="absolute"
            borderColor="#fff"
            top={height / 2 - width / 4}></Box>
          <Box
            position="absolute"
            bg="rgba(0,0,0,0.4)"
            w={width}
            top={0}
            right={0}
            h={height / 2 - width / 4}></Box>
          <Box
            position="absolute"
            bg="rgba(0,0,0,0.4)"
            w={width}
            bottom={0}
            right={0}
            h={height / 2 - width / 4 - 48}></Box>
          <Box
            position="absolute"
            bg="rgba(0,0,0,0.4)"
            w={width / 4}
            top={height / 2 - width / 4}
            right={0}
            h={width / 2}></Box>
          <Box
            position="absolute"
            bg="rgba(0,0,0,0.4)"
            w={width / 4}
            top={height / 2 - width / 4}
            left={0}
            h={width / 2}></Box>

          <Box
            bg="rgba(0,0,0,0.4)"
            position="absolute"
            top={0}
            left={0}
            right={0}
            pt="20px">
            <Header back onBack={() => setIsOpen(false)} color="#fff" setting />
          </Box>
        </VStack>
      </Modal>
    </Page>
  );
};

export default AboutScan;
