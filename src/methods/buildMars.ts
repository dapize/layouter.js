import buildAttr from '../helpers/buildAttr';

const buildMars = (
  valMars: string,
  insertStyles: boolean = false
) => {
  return buildAttr(valMars, 'mar', insertStyles);
};

export default buildMars;
