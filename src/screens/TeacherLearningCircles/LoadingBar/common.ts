import PathRoutes from '../../../routers/paths';

const loadingBarItems: Array<keyof typeof PathRoutes.teacherLearningCircles> = [
  'checkingStats',
  'unitSelect',
  'introduction',
  'situations',
  'explanation',
  'activities',
  'finish',
];

export default loadingBarItems;
