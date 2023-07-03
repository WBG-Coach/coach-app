import {ViewProps} from 'react-native';
import {icons} from './Icon.data';

export type IconsNameType = keyof typeof icons;

export interface OwnProps {
  color?: string;
  width?: number;
  name: IconsNameType;
  onPress?: () => void;
  size?: 14 | 16 | 20 | 24 | 32 | 42 | 48 | number;
}

export type Props = OwnProps & ViewProps;
