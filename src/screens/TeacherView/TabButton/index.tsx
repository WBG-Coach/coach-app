import React from 'react';
import {Box, Center, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

type Props = {
  index: number;
  onPress: () => void;
  isActive: boolean;
  tab: {label: string};
};

const TabButton: React.FC<Props> = ({isActive, tab, index, onPress}) => {
  const {t} = useTranslation();

  return (
    <VStack position={'relative'} key={index} flex={1} py={2}>
      <Center>
        <TouchableOpacity onPress={onPress}>
          <Text
            fontSize={'TSM'}
            fontWeight={isActive ? 700 : 500}
            color={isActive ? 'primary.200' : 'gray.700'}>
            {t(tab.label)}
          </Text>
        </TouchableOpacity>
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
  );
};

export default TabButton;
