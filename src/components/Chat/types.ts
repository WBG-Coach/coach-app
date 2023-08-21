export type ChatMessage = {
  sender: string;
  color: string;
  message: string;
};

export type Props = {
  messages: ChatMessage[];
};
