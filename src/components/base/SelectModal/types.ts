export type Props = {
  value?: string;
  handleSelectValue: (value: string) => void;
  placeholder?: string;
  bottomTitle: string;
  isInvalid?: boolean;
  options: {value: string; label: string}[];
};
