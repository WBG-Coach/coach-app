import Image from '../../database/models/Image';

export type Props = {
  created_at: number;
  handleDelete?: () => void;
} & Partial<Image>;
