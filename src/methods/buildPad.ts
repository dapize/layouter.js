import buildAttr from '../helpers/buildAttr';

const buildPad = (
  valPads: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valPads, 'pad', insertStyles);
};

export default buildPad;
