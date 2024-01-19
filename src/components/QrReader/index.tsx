import {Box, HStack, Text, VStack} from 'native-base';
import {useEffect} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import Icon from '../Icon';

const QRCODE_SIZE = 250;

type Props = {
  onRead: (code: string) => void;
  onBack: () => void;
  onClickSetting: () => void;
};

const QrReader: React.FC<Props> = ({onBack, onClickSetting, onRead}) => {
  const {height, width} = Dimensions.get('screen');
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      if (codes[0] && codes[0].value) onRead(codes[0].value);
    },
  });

  useEffect(() => {
    if (hasPermission) {
      requestPermission();
    }
  }, [hasPermission]);

  return (
    <Box flex={1} w="full" position="relative">
      <HStack zIndex={2} bg="rgba(0, 0, 0, .4)">
        <SafeAreaView>
          <HStack
            mx="16px"
            py="12px"
            w={width - 32}
            mt={StatusBar.currentHeight}
            justifyContent="space-between">
            <TouchableOpacity onPress={onBack}>
              <Icon size={24} name={'angle-left'} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onClickSetting}>
              <Icon size={24} name="setting" color={'white'} />
            </TouchableOpacity>
          </HStack>
        </SafeAreaView>
      </HStack>

      {device && hasPermission ? (
        <Camera
          device={device}
          isActive={true}
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          onError={error => {
            console.log({error});
          }}
        />
      ) : (
        <Text color="red.600">{'test'}</Text>
      )}

      <Box
        position="absolute"
        bg="rgba(0,0,0,0.4)"
        w={width}
        top={0}
        right={0}
        h={`${(height - QRCODE_SIZE) / 2 + 10}px`}
      />

      <Box
        position="absolute"
        bg="rgba(0,0,0,0.4)"
        w={width}
        bottom={0}
        right={0}
        h={`${
          (height - QRCODE_SIZE) / 2 + 10 - (StatusBar.currentHeight || 0) * 2
        }px`}
      />

      <Box
        right={0}
        position="absolute"
        bg="rgba(0,0,0,0.4)"
        h={`${QRCODE_SIZE - 20}px`}
        w={`${(width - QRCODE_SIZE) / 2 + 10}px`}
        top={`${(height - QRCODE_SIZE) / 2 + 10}px`}
      />

      <Box
        left={0}
        position="absolute"
        bg="rgba(0,0,0,0.4)"
        h={`${QRCODE_SIZE - 20}px`}
        w={`${(width - QRCODE_SIZE) / 2 + 10}px`}
        top={`${(height - QRCODE_SIZE) / 2 + 10}px`}
      />

      <Box
        bg="rgba(0,0,0,0.4)"
        position="absolute"
        top={0}
        left={0}
        right={0}
      />

      <Box
        w={QRCODE_SIZE / 2 - 40}
        h={QRCODE_SIZE / 2 - 40}
        right={`${(width - QRCODE_SIZE) / 2}px`}
        borderRightWidth="4px"
        borderTopWidth="4px"
        position="absolute"
        borderColor="#fff"
        top={`${(height - QRCODE_SIZE) / 2}px`}
      />

      <Box
        w={QRCODE_SIZE / 2 - 40}
        h={QRCODE_SIZE / 2 - 40}
        right={`${(width - QRCODE_SIZE) / 2}px`}
        borderRightWidth="4px"
        borderBottomWidth="4px"
        position="absolute"
        borderColor="#fff"
        bottom={`${
          (height - QRCODE_SIZE) / 2 - (StatusBar.currentHeight || 0) * 2
        }px`}
      />

      <Box
        w={QRCODE_SIZE / 2 - 40}
        h={QRCODE_SIZE / 2 - 40}
        left={(width - QRCODE_SIZE) / 2}
        borderLeftWidth="4px"
        borderBottomWidth="4px"
        position="absolute"
        borderColor="#fff"
        bottom={(height - QRCODE_SIZE) / 2 - (StatusBar.currentHeight || 0) * 2}
      />

      <Box
        w={QRCODE_SIZE / 2 - 40}
        h={QRCODE_SIZE / 2 - 40}
        left={(width - QRCODE_SIZE) / 2}
        borderLeftWidth="4px"
        borderTopWidth="4px"
        position="absolute"
        borderColor="#fff"
        top={(height - QRCODE_SIZE) / 2}
      />
    </Box>
  );
};
export default QrReader;
