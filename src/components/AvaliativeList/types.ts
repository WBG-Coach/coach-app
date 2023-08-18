import {itemIcon} from './common';

export type AvaliativeItem = {
  icon: keyof typeof itemIcon;
  title: string;
  description: string;
  box?: {
    title: string;
    description: string;
  };
};

export type Props = {
  items: AvaliativeItem[];
};
