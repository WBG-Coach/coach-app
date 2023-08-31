import {itemIcon} from './common';
import {Props as TipProps} from './TipBox/types';

export type EvaluativeItem = {
  icon: keyof typeof itemIcon;
  title: string;
  description: string;
};

export type Props = {
  item: EvaluativeItem;
};
