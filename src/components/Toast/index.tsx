import React, {useMemo} from 'react';
import Icon from '../Icon';
import {HStack, Text, VStack} from 'native-base';
import {IconsNameType} from '../Icon/types';

type Props = {
  icon: IconsNameType;
  title: string;
  description?: string;
  type?: 'success' | 'warning' | 'error';
};

const Toast: React.FC<Props> = ({icon, title, description, type}) => {
  const bgColor = useMemo(() => {
    switch (type) {
      case 'warning':
        return '#FCE9C5';
      case 'error':
        return '#FCC9C5';
      default:
        return '#CEF3CF';
    }
  }, [type]);

  const iconColor = useMemo(() => {
    switch (type) {
      case 'warning':
        return '#9B6908';
      case 'error':
        return '#9B1208';

      default:
        return '#218225';
    }
  }, [type]);

  return (
    <HStack bg={bgColor} p="12px" borderRadius="8px" alignItems="center">
      <Icon name={icon} color={iconColor} size={16} />
      <VStack ml="8px" w="300px">
        <Text fontSize="16px" fontWeight={500} color="#111417">
          {title}
        </Text>
        {description && (
          <Text mt="4px" fontSize="14px" color="#111417">
            {description}
          </Text>
        )}
      </VStack>
    </HStack>
  );
};

export default Toast;
