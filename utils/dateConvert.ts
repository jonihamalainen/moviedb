export const dateConvert = (rawDate: string): string => {
  const date: Date = new Date(rawDate);

  const LocaleDateString = date.toLocaleString();

  return LocaleDateString;

};
