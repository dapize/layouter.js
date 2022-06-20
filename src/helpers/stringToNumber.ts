const stringToNumber = (n: string): number => {
  return typeof n === 'string' ? parseFloat(n) : n;
};
export default stringToNumber;
