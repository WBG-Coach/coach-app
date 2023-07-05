export type Props = {
  image?: {name: string; value: string};
  handleSelectImage: (asset: {name: string; value: string}) => void;
};
