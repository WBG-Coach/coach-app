export const getTags = (t: (key: string) => string, theme?: any) => [
  {
    label: t('components.starsTag.notEvaluted') || 'Poor',
    background: 'primary.0',
    color: theme?.colors.primary['300'],
    icon: 'award-solid',
  },
  {
    label: t('components.starsTag.needsWork') || 'Needs work',
    background: 'yellow.0',
    color: theme?.colors.yellow['300'],
    icon: 'star-solid',
  },
  {
    label: t('components.starsTag.needsAttention') || 'Needs attention',
    background: 'yellow.0',
    color: theme?.colors.yellow['300'],
    icon: 'star-solid',
  },
  {
    label: t('components.starsTag.almostThere') || 'Almost there',
    background: 'violet.0',
    color: theme?.colors.violet['300'],
    icon: 'star-solid',
  },
  {
    label: t('components.starsTag.doingGreat') || 'Doing great',
    background: 'green.0',
    color: theme?.colors.green['300'],
    icon: 'star-solid',
  },
];
