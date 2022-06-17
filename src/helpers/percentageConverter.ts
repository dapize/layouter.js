const percentageConverter = ( percentage: string ) => {
  return '0¯' + percentage.replace('%', '');
};

export default percentageConverter
