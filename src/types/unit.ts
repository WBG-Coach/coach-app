import {itemIcon} from '../components/AvaliativeList/common';

export type Unit = {
  title: string;
  description: string;

  introduction: Introduction[];
  situational: Situational[];
  explanation: Explanation[];
  activities: Activity[];
};

export type Introduction = {
  image: string;
  title: string;
  subtitle?: string;
  buttonLabel: string;
  afterComponent?: {
    title: string;
    items: string[];
  };
};

export type Situational = {
  title: string;
  subtitle?: string;
  evaluativeList?: Evaluative[];
  chat?: Chat[];
  buttonLabel: string;
};

export type Explanation = {
  evaluativeList?: Evaluative[];
  afterComponent?: {
    title: string;
    items: string[];
  };
};

export type Activity = {
  evaluativeList?: Evaluative[];
  buttonLabel: string;
  chat?: Chat[];
};

export type Evaluative = {
  icon: keyof typeof itemIcon;
  title: string;
  description: string;
  box?: Box;
};

export type Message = {
  sender: string;
  color: string;
  message: string;
};

export type Chat = {
  title: string;
  description: string;
  messages: Message[];
  box: Box;
};

export type Box = {
  title: string;
  description: string;
  icon?: string;
  iconColor?: string;
  bgColor?: string;
};
