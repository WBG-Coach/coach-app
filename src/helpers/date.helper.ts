export const ignoreTimezone = (data: Date): Date => {
  return new Date(data.getTime() - data.getTimezoneOffset() * 60000);
};
