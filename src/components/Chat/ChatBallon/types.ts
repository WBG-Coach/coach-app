import {ChatMessage} from '../types';

export interface Props extends ChatMessage {
  position: 'left' | 'rigth';
}
