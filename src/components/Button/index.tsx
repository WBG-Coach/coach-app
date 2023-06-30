import {Button as NButton, IButtonProps} from 'native-base';
import React from 'react';

type Props = {
  variant?: 'solid' | 'outlined';
};

const Button: React.FC<IButtonProps & Props> = props => {
  if (props.variant === 'outlined') {
    return (
      <NButton
        {...props}
        px="16px"
        py="12px"
        bg="white"
        borderWidth="1px"
        borderRadius="12px"
        _pressed={{bg: 'primary.100'}}
        _text={{color: 'primary.200'}}
        borderColor="primary.200"
        {...(props.disabled && {background: '#F2F4F7'})}
      />
    );
  }

  return (
    <NButton
      {...props}
      px="16px"
      py="12px"
      mb="16px"
      bg="primary.200"
      _pressed={{bg: 'primary.300'}}
      borderRadius="12px"
      {...(props.disabled && {background: '#F2F4F7'})}
    />
  );
};

export default Button;
