import buildAttr from '../helpers/buildAttr';

const buildPads = (
  valPads: string | string[],
  insertStyles: boolean = false
) => {
  return buildAttr(valPads, 'pad', insertStyles);
};

export default buildPads;
