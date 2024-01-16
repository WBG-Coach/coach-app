import {COUNTRY} from '@env';
import indicatorNPImages from '../../../../../../assets/images/teacherStats/indicator/np';
import indicatorSLImages from '../../../../../../assets/images/teacherStats/indicator/sl';

const Images = COUNTRY === 'np' ? indicatorNPImages : indicatorSLImages;

export const chartData = [
  {start: 0, image: Images.needsWork.low},
  {start: 1, image: Images.needsWork.medium},
  {start: 1.5, image: Images.needsWork.high},

  {start: 2.0, image: Images.keepWorking.low},
  {start: 2.4, image: Images.keepWorking.medium},
  {start: 2.8, image: Images.keepWorking.high},

  {start: 3.0, image: Images.almostThere.low},
  {start: 3.4, image: Images.almostThere.medium},
  {start: 3.8, image: Images.almostThere.high},

  {start: 4.0, image: Images.doingGreat.low},
  {start: 4.4, image: Images.doingGreat.medium},
  {start: 4.8, image: Images.doingGreat.high},
  {start: 5, image: Images.doingGreat.high},
];
