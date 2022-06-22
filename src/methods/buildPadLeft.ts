import buildAttr from '../helpers/buildAttr';

const buildPadLeft = (
  valPadLeft: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valPadLeft, 'padl', insertStyles);
};

export default buildPadLeft;
