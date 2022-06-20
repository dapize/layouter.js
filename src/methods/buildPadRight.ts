import buildAttr from '../helpers/buildAttr';

const buildPadRight = (
  valPadRight: string | string[],
  insertStyles: boolean = false
) => {
  return buildAttr(valPadRight, 'padr', insertStyles);
};

export default buildPadRight;
