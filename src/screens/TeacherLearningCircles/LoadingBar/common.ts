import PathRoutes from '../../../routers/paths';

const loadingBarItems: {
  key: keyof typeof PathRoutes.teacherLearningCircles;
  label: string;
}[] = [
  {
    key: 'checkingStats',
    label: 'Check stats',
  },
  {
    key: 'unitSelect',
    label: 'Unit select',
  },
  {
    key: 'situations',
    label: 'Situations',
  },
  {
    key: 'explanation',
    label: 'Explanation',
  },
  {
    key: 'activities',
    label: 'Activities',
  },
  {
    key: 'finish',
    label: 'Finish',
  },
];

export default loadingBarItems;
