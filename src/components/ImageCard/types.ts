import {Image} from '../../types/image';

export type Props = {
  created_at: number;
  handleDelete?: () => void;
  transformBase?: boolean;
} & Partial<Image>;
