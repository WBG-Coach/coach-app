import {ImageSourcePropType} from 'react-native';
import {EvaluativeItem} from '../components/EvaluativeList/types';

export type Unit = {
  title: string;
  description: string;

  introduction: DynamicPage[];
  situations: DynamicPage[];
  explanation: DynamicPage[];
  activities: DynamicPage[];
};

export type DynamicPage = {
  chat?: Chat[];
  title: string;
  subtitle?: string;
  buttonLabel: string;
  nextRoute?: string;
  image?: ImageSourcePropType;
  evaluativeList?: {item: EvaluativeItem; box?: Box}[];
  afterComponent?: {
    title: string;
    items: string[];
  };
};

export type Introduction = {
  image: ImageSourcePropType;
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
  evaluativeList?: EvaluativeItem[];
  chat?: Chat[];
  buttonLabel: string;
};

export type Explanation = {
  title: string;
  subtitle?: string;
  evaluativeList?: EvaluativeItem[];
  afterComponent?: {
    title: string;
    items: string[];
  };
};

export type Activity = {
  title: string;
  subtitle?: string;
  evaluativeList?: EvaluativeItem[];
  buttonLabel: string;
  chat?: Chat[];
};

export type Message = {
  sender: string;
  color: string;
  message: string;
};

export type Chat = {
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
