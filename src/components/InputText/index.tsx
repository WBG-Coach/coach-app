import React from 'react';
import {IInputProps, Input, Text} from 'native-base';

type Props = {
  errorMessage?: string;
};

const InputText: React.FC<IInputProps & Props> = props => {
  return (
    <>
      <Input
        {...props}
        w="full"
        py="12px"
        pl="16px"
        {...(props.errorMessage ? {borderColor: 'red.200'} : {})}
      />
      {props.errorMessage && (
        <Text color="red.200" w="full" fontSize="12px">
          {props.errorMessage}
        </Text>
      )}
    </>
  );
};

export default InputText;
