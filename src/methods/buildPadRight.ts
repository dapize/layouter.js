import buildAttr from '../helpers/buildAttr';

const buildPadRight = (valPadRight: string, insertStyles = false) => {
  return buildAttr(valPadRight, 'padr', insertStyles);
};

export default buildPadRight;
