import React from 'react';
import {Box, Center, Text, VStack} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';

type Props = {
  onPress: () => void;
  isActive: boolean;
  label: string;
};

const TabButton: React.FC<Props> = ({isActive, label, onPress}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity onPress={onPress}>
      <VStack position={'relative'} flex={1} py={2}>
        <Center>
          <Text
            fontSize={'TSM'}
            fontWeight={isActive ? 700 : 500}
            color={isActive ? 'primary.200' : 'gray.700'}>
            {t(label)}
          </Text>
        </Center>

        {isActive && (
          <Box
            w={'100%'}
            position={'absolute'}
            bottom={'-10px'}
            height={'2px'}
            background={'primary.200'}
          />
        )}
      </VStack>
    </TouchableOpacity>
  );
};

export default TabButton;
