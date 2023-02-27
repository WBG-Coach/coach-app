import {ViewProps} from 'react-native';

export interface OwnProps {
  /** Icon name (see names on example below) */
  name: string;
  /** Icon color */
  color?: string;
  /** Icon size (square: size x size) */
  size?: 14 | 16 | 20 | 24 | 32 | 42 | 48 | number;
  width?: number;
  onPress?: any;
}

export type Props = OwnProps & ViewProps;
