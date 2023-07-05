import {Box, Text, useTheme} from 'native-base';
import React, {forwardRef, useState} from 'react';
import {StyledBoxInput, StyledTextInput, StyledPlaceHolder} from './styles';
import Icon from '../Icon';
import {Props} from './types';
import {TouchableWithoutFeedback} from 'react-native';
import {masks} from './masks';

const Input: React.FC<Props> = forwardRef((props, ref: any) => {
  const [showPassword, setShowPassword] = useState(props.secureTextEntry);
  const [InFocus, setInFocus] = useState(false);
  const theme = useTheme();

  const applyMask = () => masks[props.variant || 'text'](props.value || '');
  const removeMask = (val: string) => masks.removeMask(val);

  return (
    <StyledBoxInput {...props}>
      {!props.icon && (
        <StyledPlaceHolder
          variant={props.variant}
          labelIsUpped={!!props.value || InFocus}>
          <Text
            flex={1}
            fontFamily={'lato'}
            color={
              props.isDisabled
                ? 'gray.400'
                : props.isInvalid
                ? 'red.200'
                : InFocus
                ? 'primary.200'
                : 'gray.600'
            }
            fontSize={props.value || InFocus ? '12px' : '16px'}>
            {props?.placeholder}
          </Text>
        </StyledPlaceHolder>
      )}

      {props.maxLength && (
        <Text
          top={2}
          right={4}
          position={'absolute'}
          fontFamily={'lato'}
          color={
            props.isDisabled
              ? 'gray.400'
              : props.isInvalid
              ? 'red.200'
              : InFocus
              ? 'primary.200'
              : 'gray.600'
          }
          fontSize={'12px'}>
          {props.value?.length || 0} / {props.maxLength}
        </Text>
      )}

      {props.icon && (
        <Box position={'absolute'} right={'14px'} top={'18px'} zIndex={2}>
          <TouchableWithoutFeedback
            onPress={() => props.onChangeText && props.onChangeText('')}>
            <Icon
              color={(theme.colors as any).gray['600']}
              name={'times-circle'}
              size={22}
            />
          </TouchableWithoutFeedback>
        </Box>
      )}

      {props.secureTextEntry && (
        <TouchableWithoutFeedback
          onPress={() => setShowPassword(!showPassword)}>
          <Box position={'absolute'} right={'14px'} top={'18px'} zIndex={2}>
            <Icon
              color={(theme.colors as any).gray['600']}
              name={showPassword ? 'eye' : 'eye-slash'}
              size={22}
            />
          </Box>
        </TouchableWithoutFeedback>
      )}

      <StyledTextInput
        ref={ref}
        {...props}
        theme={theme}
        inInput={InFocus}
        haveIcon={!!props.icon}
        isInvalid={props.isInvalid}
        editable={!props.isDisabled}
        secureTextEntry={showPassword}
        onFocus={() => setInFocus(true)}
        onBlur={() => setInFocus(false)}
        {...(props.value && {value: applyMask()})}
        onChangeText={(text: string) =>
          props.onChangeText &&
          props.onChangeText(
            props.variant && props.variant !== 'text' ? removeMask(text) : text,
          )
        }
        placeholderTextColor={
          props.icon ? (theme.colors as any).gray['600'] : 'transparent'
        }
      />
    </StyledBoxInput>
  );
});
export default Input;
