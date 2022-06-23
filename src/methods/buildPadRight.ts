import buildAttr from '../helpers/buildAttr';

const buildPadRight = (
  valPadRight: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valPadRight, 'padr', insertStyles);
};

export default buildPadRight;
