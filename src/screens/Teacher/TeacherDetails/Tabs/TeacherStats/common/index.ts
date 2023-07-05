import * as needsWork from '../../../../../../assets/images/teacherStats/indicator/needsWork';
import * as keepWorking from '../../../../../../assets/images/teacherStats/indicator/keepWorking';
import * as almostThere from '../../../../../../assets/images/teacherStats/indicator/almostThere';
import * as doingGreat from '../../../../../../assets/images/teacherStats/indicator/doingGreat';

export const chartData = [
  {start: 0, image: needsWork.low},
  {start: 1, image: needsWork.medium},
  {start: 1.5, image: needsWork.high},

  {start: 2.0, image: keepWorking.low},
  {start: 2.4, image: keepWorking.medium},
  {start: 2.8, image: keepWorking.high},

  {start: 3.0, image: almostThere.low},
  {start: 3.4, image: almostThere.medium},
  {start: 3.8, image: almostThere.high},

  {start: 4.0, image: doingGreat.low},
  {start: 4.4, image: doingGreat.medium},
  {start: 4.8, image: doingGreat.high},
  {start: 5, image: doingGreat.high},
];
