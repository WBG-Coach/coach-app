import {itemIcon} from './common';
import {Props as TipProps} from './TipBox/types';

export type AvaliativeItem = {
  icon: keyof typeof itemIcon;
  title: string;
  description: string;
  box?: TipProps;
};

export type Props = {
  items: AvaliativeItem[];
};
