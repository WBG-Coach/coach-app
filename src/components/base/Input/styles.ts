import {View} from 'native-base';
import {TextInput} from 'react-native';
import styled from 'styled-components';
import {layout, margin} from 'styled-system';
import {Props} from './types';

interface TextInputProps extends Props {
  isInvalid?: boolean;
  haveIcon?: boolean;
  inInput: boolean;
  theme: any;
}

export const StyledPlaceHolder = styled(View)<{
  labelIsUpped: boolean;
  variant: any;
}>`
  padding-top: ${props => (props.labelIsUpped ? '8px' : '16px')};
  transition: all 300ms;
  position: absolute;
  flex-direction: row;
  padding-left: ${props => (props.variant === 'date' ? '39px' : '16px')};
  padding-right: 16px;
  border-radius: 8px;
  left: 0;
  top: 0;
`;

export const StyledBoxInput = styled(View)<any>`
  position: relative;
  width: 100%;
  ${margin}
`;

export const StyledTextInput = styled(TextInput)<TextInputProps>`
  font-size: 16px;
  min-height: 56px;
  border-width: 1px;
  border-color: ${props =>
    props.isInvalid
      ? props.theme.colors.red['200']
      : props.inInput
      ? props.theme.colors.primary['200']
      : props.theme.colors.gray['400']};

  padding: ${props =>
    props.haveIcon
      ? '12px 40px'
      : props.placeholder && (!!props.value || props.inInput)
      ? '22px 20px 8px ' + (props.variant === 'date' ? '38px' : '15px')
      : '16px 20px'};

  border-radius: 8px;
  color: ${props =>
    props.editable
      ? props.theme.colors.gray['700']
      : props.theme.colors.gray['500']};

  ${props =>
    !props.editable &&
    props.variant !== 'date' &&
    !props.value &&
    "background-color: 'rgba(55, 55, 55, 0.1)'"}

  ${layout}
`;
