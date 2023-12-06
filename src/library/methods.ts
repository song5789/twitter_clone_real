export const convertToLocaleDate = (timestamp: number) => {
  return new Date(timestamp).toLocaleDateString();
};
