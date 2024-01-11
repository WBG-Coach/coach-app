import {TextInputProps} from 'react-native';

export interface Props extends TextInputProps {
  length: number;
  isInvalid?: boolean;
}
