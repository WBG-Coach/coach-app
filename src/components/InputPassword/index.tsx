import React, {useState} from 'react';
import {IInputProps, Input, Pressable, Text} from 'native-base';
import Icon from '../Icon';

type Props = {
  errorMessage?: string;
};

const InputPassword: React.FC<IInputProps & Props> = props => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Input
        {...props}
        w={'full'}
        py="12px"
        pl="16px"
        type={show ? 'text' : 'password'}
        {...(props.errorMessage ? {borderColor: 'red.200'} : {})}
        InputRightElement={
          <Pressable mr="16px" ml="8px" onPress={() => setShow(!show)}>
            <Icon name={show ? 'eye' : 'eye-slash'} color="#576375" />
          </Pressable>
        }
      />
      {props.errorMessage && (
        <Text color="red.200" w="full" fontSize="12px">
          {props.errorMessage}
        </Text>
      )}
    </>
  );
};

export default InputPassword;
