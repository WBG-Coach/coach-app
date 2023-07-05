import {TextInputProps} from 'react-native';
import {LayoutProps, MarginProps} from 'styled-system';
import {masks} from './masks';

export type Props = {
  readonly variant?: keyof typeof masks;
  isDisabled?: boolean;
  isInvalid?: boolean;
  icon?: string;
} & TextInputProps &
  LayoutProps &
  MarginProps;
