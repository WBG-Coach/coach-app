export type Props = {
  isOpen: boolean;
  onClose: () => void;
  handleSelectImage: (asset: {name: string; value: string}) => void;
};
