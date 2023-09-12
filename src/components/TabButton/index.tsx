import React from 'react';
import {Box, Center, Text, VStack} from 'native-base';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity} from 'react-native';

type Props = {
  onPress: () => void;
  isActive: boolean;
  label: string;
};

const TabButton: React.FC<Props> = ({isActive, label, onPress}) => {
  const {t} = useTranslation();

  return (
    <TouchableOpacity style={{flex: 1, position: 'relative'}} onPress={onPress}>
      <VStack py={4}>
        <Center>
          <Text
            numberOfLines={1}
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
            bottom={'-2px'}
            height={'2px'}
            background={'primary.200'}
          />
        )}
      </VStack>
    </TouchableOpacity>
  );
};

export default TabButton;
