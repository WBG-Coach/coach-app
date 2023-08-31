import {HStack, Text, VStack, useTheme} from 'native-base';
import React from 'react';
import Icon from '../../Icon';
import {Props} from './types';

const TipBox: React.FC<Props> = ({
  description,
  title,
  bgColor,
  icon,
  iconColor,
}) => {
  const theme = useTheme();

  return (
    <VStack
      my={4}
      p={3}
      borderWidth={'1px'}
      borderColor={bgColor ? 'transparent' : 'primary.200'}
      borderRadius={'8px'}
      {...(bgColor && {bg: bgColor})}>
      <HStack space={2} alignItems={'center'}>
        <Icon
          name={(icon as any) || 'question-circle-solid'}
          color={iconColor || theme.colors.primary['200']}
          size={18}
        />
        <VStack>
          <Text fontSize={'LSM'} fontWeight={500} color={'gray.700'}>
            {title}
          </Text>
          <Text fontSize={'TXS'} fontWeight={400} color={'gray.600'}>
            {description}
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
};

export default TipBox;
