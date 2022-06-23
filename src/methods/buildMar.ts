import buildAttr from '../helpers/buildAttr';

const buildMar = (
  valMars: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMars, 'mar', insertStyles);
};

export default buildMar;
